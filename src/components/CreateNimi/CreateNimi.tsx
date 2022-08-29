import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { unstable_batchedUpdates } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useRef, useState, useCallback, useMemo } from 'react';
import { ContractTransaction, ContractReceipt } from '@ethersproject/contracts';

import { ReactComponent as DragDots } from '../../assets/svg/dragdots.svg';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Nimi,
  nimiCard,
  NimiLinkType,
  NimiLinkBaseDetails,
  NimiWidgetType,
  NimiBlockchainAddress,
  NimiPOAPWidget,
} from 'nimi-card';
import { CardBody, Card } from '../Card';
import {
  InnerWrapper,
  MainContent,
  PreviewContent,
  PageSectionTitle,
  ProfileImage,
  ProfileImagePlaceholder,
  AddFieldsButton,
  SaveAndDeployButton,
  PreviewMobile,
  BackButton,
  LinkWrapper,
  AddresssWrapper,
  AddressesTitle,
} from './styled';

import { Label, Input, TextArea, FormGroup } from '../form';

// Partials
import { ImportButtonsWrapper, ImportFromLensProtocolButton, ImportFromTwitterButton } from './partials/buttons';
import { NimiBlockchainField } from './partials/NimiBlockchainField';
import { NimiLinkField } from './partials/NimiLinkField';
import { AddFieldsModal } from './partials/AddFieldsModal';
import { NimiPreviewCard } from './partials/NimiPreviewCard';
import { ImportFromTwitterModal } from './partials/ImportFromTwitterModal';
import { FormWrapper, LinkFormGroup } from '../form/FormGroup';
import { useLocation } from 'react-router-dom';
import { ENSMetadata } from '../../hooks/useENSMetadata';
import { setENSNameContentHash } from '../../hooks/useSetContentHash';
import { useENSPublicResolverContract } from '../../hooks/useENSPublicResolverContract';
import { PublishNimiModal } from './partials/PublishNimiModal';
import { useLensDefaultProfileData } from '../../hooks/useLensDefaultProfileData';
import { publishNimiViaIPNS } from './api';
import { Web3Provider } from '@ethersproject/providers';
import { namehash as ensNameHash, encodeContenthash } from '@ensdomains/ui';
import styled from 'styled-components';
import { PoapField } from './partials/PoapField/PoapField';

export interface CreateNimiProps {
  ensAddress: string;
  ensName: string;
  ensLabelName: string;
  provider: Web3Provider;
}

const StyledDots = styled.div`
  display: flex;
`;

export function CreateNimi({ ensAddress, ensName, provider }: CreateNimiProps) {
  /**
   * @todo replace this API
   */
  const [isAddFieldsModalOpen, setIsAddFieldsModalOpen] = useState(false);
  const [isImportFromTwitterModalOpen, setIsImportFromTwitterModalOpen] = useState(false);
  const location = useLocation();
  const ensMetadata = location.state as ENSMetadata;

  const { loading: loadingLensProfile, defaultProfileData: lensProfile } = useLensDefaultProfileData();
  const { t } = useTranslation('nimi');

  /**
   * Publish Nimi state
   * @todo create a reducer or context for this
   */
  const publicResolverContract = useENSPublicResolverContract();
  const [isPublishNimiModalOpen, setIsPublishNimiModalOpen] = useState(false);
  const [isPublishingNimi, setIsPublishingNimi] = useState(false);
  const [isNimiPublished, setIsNimiPublished] = useState(false);
  const [publishNimiError, setPublishNimiError] = useState<Error>();
  const [publishNimiResponseIpfsHash, setPublishNimiResponseIpfsHash] = useState<string>();
  const [setContentHashTransaction, setSetContentHashTransaction] = useState<ContractTransaction>();
  const [setContentHashTransactionReceipt, setSetContentHashTransactionReceipt] = useState<ContractReceipt>();
  const publishNimiAbortController = useRef<AbortController>();

  // Form state manager
  const useFormContext = useForm<Nimi>({
    resolver: yupResolver(nimiCard, {
      stripUnknown: true,
      abortEarly: false,
    }),
    defaultValues: {
      displayName: ensName,
      displayImageUrl: ensMetadata?.image,
      description: '',
      ensAddress: ensAddress,
      ensName,
      addresses: [],
      links: [],
      widgets: [
        {
          type: NimiWidgetType.POAP,
          address: ensAddress,
        },
      ],
    },
  });

  const { register, watch, handleSubmit, setValue, getValues } = useFormContext;

  // To keep the same order of links and addresses, compute
  // the list of blockchain addresses and links from Nimi
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  const formWatchPayload = watch();

  console.log('LINKS WATCHING', formWatchPayload.links);

  const handleImportLensProfile = useCallback(() => {
    if (!lensProfile) return;
    setValue('displayName', lensProfile.name);
    setValue('description', lensProfile.description);
    setValue('displayImageUrl', lensProfile?.pictureUrl);
  }, [setValue, lensProfile]);

  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    const updatedList = [...links];

    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);

    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

    // Update State
    setValue('links', updatedList);
  };

  const links = useMemo(() => formWatchPayload.links, [formWatchPayload]);

  // eslint-disable-next-line react/display-name
  const getRenderItem = (items) => (provided, snapshot, rubric) => {
    const index = rubric.source.index;
    const item = items[index];
    const type = item.type;
    console.log('outisde---------------');
    console.log('titlePassed', item.title);
    console.log('indexPassed', index);
    console.log('outisde---------------');
    return (
      <LinkFormGroup ref={provided.innerRef} {...provided.draggableProps} key={'link-input-' + type + index}>
        <StyledDots {...provided.dragHandleProps}>
          <DragDots />
        </StyledDots>

        <NimiLinkField
          key={'link-input' + type + index}
          title={item.title}
          link={type as NimiLinkType}
          index={index}
          content={item.content}
        />
      </LinkFormGroup>
    );
  };

  /**
   * Handle the form submit via ENS contract interaction
   * @param data a validated Nimi object
   */
  const onSubmitValid = async (data: Nimi) => {
    unstable_batchedUpdates(() => {
      setIsPublishNimiModalOpen(true);
      setIsPublishingNimi(true);
      setPublishNimiError(undefined);
      setIsNimiPublished(false);
    });
    console.log('data', data);

    try {
      if (!publicResolverContract) {
        throw new Error('ENS Public Resolver contract is not available.');
      }

      publishNimiAbortController.current = new AbortController();

      const signature = await provider.getSigner().signMessage(JSON.stringify(data));

      const { cidV1, ipns } = await publishNimiViaIPNS({
        nimi: data,
        signature,
        controller: publishNimiAbortController.current,
      });

      if (!cidV1) {
        throw new Error('No CID returned from publishNimiViaIPNS');
      }

      // Get current content hash from ENS contract
      const currentContentHashEncoded = await publicResolverContract.contenthash(ensNameHash(ensName));
      const contentHash = `ipns://${ipns}`;
      const newContentHashEncoded = encodeContenthash(contentHash).encoded as unknown as string;

      // User already uses the Nimi IPNS
      if (newContentHashEncoded === currentContentHashEncoded) {
        unstable_batchedUpdates(() => {
          setIsNimiPublished(true);
          setIsPublishingNimi(false);
        });
        return;
      }

      // Set the content
      setPublishNimiResponseIpfsHash(ipns);
      const setContentHashTransaction = await setENSNameContentHash({
        contract: publicResolverContract,
        name: data.ensName,
        contentHash,
      });

      setSetContentHashTransaction(setContentHashTransaction);

      const setContentHashTransactionReceipt = await setContentHashTransaction.wait();

      unstable_batchedUpdates(() => {
        setSetContentHashTransactionReceipt(setContentHashTransactionReceipt);
        setIsNimiPublished(true);
        setIsPublishingNimi(false);
      });
    } catch (error) {
      console.error(error);
      unstable_batchedUpdates(() => {
        setIsPublishingNimi(false);
        setPublishNimiError(error);
      });
    }
  };

  const onSubmitInvalid = (data) => {
    console.log(data);
  };
  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <FormProvider {...useFormContext}>
      <InnerWrapper>
        <MainContent showMobile={!showPreviewMobile}>
          <PageSectionTitle>{t('creatingYourProfile')}</PageSectionTitle>
          <Card>
            <CardBody>
              {formWatchPayload.displayImageUrl ? (
                <ProfileImage src={formWatchPayload.displayImageUrl} />
              ) : (
                <ProfileImagePlaceholder />
              )}

              <ImportButtonsWrapper>
                <ImportFromTwitterButton onClick={() => setIsImportFromTwitterModalOpen(true)}>
                  {t('buttonLabel.importFromTwitter')}
                </ImportFromTwitterButton>
                {!loadingLensProfile && !!lensProfile && (
                  <ImportFromLensProtocolButton onClick={handleImportLensProfile}>
                    {t('buttonLabel.importFromLensProtocol')}
                  </ImportFromLensProtocolButton>
                )}
              </ImportButtonsWrapper>
              <FormWrapper onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
                <FormGroup>
                  <Label htmlFor="displayName">{t('formLabel.displayName')}</Label>
                  <Input placeholder="Name" id="displayName" {...register('displayName')} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="description">{t('formLabel.description')}</Label>
                  <TextArea
                    onKeyDown={handleKeyDown}
                    maxLength={300}
                    placeholder="Description"
                    id="description"
                    {...register('description')}
                  ></TextArea>
                </FormGroup>
                <DragDropContext onDragEnd={handleDrop}>
                  <Droppable droppableId="list-container" renderClone={getRenderItem(links)}>
                    {(provided) => (
                      <LinkWrapper {...provided.droppableProps} ref={provided.innerRef}>
                        {links.map(({ type }, index) => (
                          <Draggable key={index.toString() + type} draggableId={index.toString()} index={index}>
                            {getRenderItem(links)}
                          </Draggable>
                        ))}
                      </LinkWrapper>
                    )}
                  </Droppable>
                </DragDropContext>
                {formWatchPayload.addresses.length > 0 && (
                  <AddresssWrapper>
                    <AddressesTitle>Addresses</AddressesTitle>
                    {formWatchPayload.addresses.map(({ blockchain }, index) => {
                      const label = t(`formLabel.${blockchain.toLowerCase()}`);

                      return (
                        <FormGroup key={'blockchain-input-' + blockchain.toLowerCase()}>
                          <NimiBlockchainField index={index} label={label} blockchain={blockchain} />
                        </FormGroup>
                      );
                    })}
                  </AddresssWrapper>
                )}

                <FormGroup>
                  {formWatchPayload.widgets.some((item) => NimiWidgetType.POAP === item.type) && <PoapField />}

                  <AddFieldsButton type="button" onClick={() => setIsAddFieldsModalOpen(true)}>
                    + {t('buttonLabel.addFields')}
                  </AddFieldsButton>
                </FormGroup>
                <FormGroup>
                  <SaveAndDeployButton type="submit">{t('publishSite')}</SaveAndDeployButton>
                </FormGroup>
                <PreviewMobile onClick={() => setShowPreviewMobile(true)}>PREVIEW PROFILE</PreviewMobile>
              </FormWrapper>
            </CardBody>
          </Card>
        </MainContent>
        <PreviewContent showMobile={showPreviewMobile}>
          <BackButton onClick={() => setShowPreviewMobile(false)}>← Back To Editor</BackButton>
          <PageSectionTitle>{t('preview')}</PageSectionTitle>

          <NimiPreviewCard nimi={formWatchPayload} />
        </PreviewContent>
      </InnerWrapper>
      {isAddFieldsModalOpen && (
        <AddFieldsModal
          initialValues={{
            links: [],
            blockchainAddresses: [],
            widgets: [],
          }}
          onClose={() => setIsAddFieldsModalOpen(false)}
          onSubmit={({ links, blockchainAddresses, widgets }) => {
            unstable_batchedUpdates(() => {
              setIsAddFieldsModalOpen(false);

              const linksData = getValues('links');

              let newLinksArray: NimiLinkBaseDetails[] = [];
              if (links.length == 0) {
                newLinksArray = [...linksData];
              } else if (linksData.length === 0) {
                newLinksArray.push({ content: '', title: '', type: links[0] });
              } else {
                newLinksArray = [...linksData, { content: '', type: links[0] }];
              }

              const currentAddresses = getValues('addresses');
              let newAddressesArray: NimiBlockchainAddress[] = [];
              if (blockchainAddresses.length === 0) {
                newAddressesArray = [...currentAddresses];
              } else if (currentAddresses.length === 0) {
                newAddressesArray.push({ blockchain: blockchainAddresses[0], address: '' });
              } else {
                newAddressesArray = [...currentAddresses, { blockchain: blockchainAddresses[0], address: '' }];
              }
              const currentWidgets = getValues('widgets');
              let newWidgets: NimiPOAPWidget[] = [];
              if (widgets.length !== 0 || currentWidgets.length !== 0) {
                newWidgets = [{ type: NimiWidgetType.POAP, address: ensAddress }];
              }

              setValue('links', newLinksArray);

              setValue('addresses', newAddressesArray);
              setValue('widgets', newWidgets);
            });
          }}
        />
      )}
      {isImportFromTwitterModalOpen && (
        <ImportFromTwitterModal
          onClose={() => setIsImportFromTwitterModalOpen(false)}
          onDataImport={(data) => {
            unstable_batchedUpdates(() => {
              // Set the fields and close the modal
              setValue('displayName', data.name);
              setValue('description', data.description);
              setValue('displayImageUrl', data.profileImageUrl);

              const prevLinkState = getValues('links') || [];

              const newState: NimiLinkBaseDetails[] = [
                ...prevLinkState,
                { type: NimiLinkType.TWITTER, title: '', content: data.username },
              ];

              setValue('links', newState);

              setIsImportFromTwitterModalOpen(false);
            });
          }}
        />
      )}
      {isPublishNimiModalOpen && (
        <PublishNimiModal
          ensName={ensName}
          ipfsHash={publishNimiResponseIpfsHash}
          isPublishing={isPublishingNimi}
          isPublished={isNimiPublished}
          publishError={publishNimiError}
          setContentHashTransaction={setContentHashTransaction}
          setContentHashTransactionReceipt={setContentHashTransactionReceipt}
          cancel={() => {
            setIsPublishNimiModalOpen(false);
            publishNimiAbortController?.current?.abort();
          }}
        />
      )}
    </FormProvider>
  );
}
