import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { unstable_batchedUpdates } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useRef, useState, useCallback, useMemo } from 'react';
import { ContractTransaction, ContractReceipt } from '@ethersproject/contracts';

import {
  Nimi,
  nimiValidator,
  NimiLinkType,
  NimiLinkBaseDetails,
  NimiWidgetType,
  NimiImageType,
  NimiBlockchainAddress,
  NimiWidget,
} from '@nimi.io/card';
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
  AddresssWrapper,
  AddressesTitle,
} from './styled';

import { Label, Input, TextArea, FormGroup } from '../form';

// Partials
import { ImportButtonsWrapper } from './partials/buttons';
import { NimiBlockchainField } from './partials/NimiBlockchainField';
import { AddFieldsModal } from './partials/AddFieldsModal';
import { NimiPreviewCard } from './partials/NimiPreviewCard';
import { ImportFromTwitterModal } from './partials/ImportFromTwitterModal';
import { FormWrapper } from '../form/FormGroup';
import { useLocation } from 'react-router-dom';
import { ENSMetadata } from '../../hooks/useENSMetadata';
import { setENSNameContentHash } from '../../hooks/useSetContentHash';
import { useENSPublicResolverContract } from '../../hooks/useENSPublicResolverContract';
import { PublishNimiModal } from './partials/PublishNimiModal';
import { useLensDefaultProfileData } from '../../hooks/useLensDefaultProfileData';
import { publishNimiViaIPNS } from './api';
import { Web3Provider } from '@ethersproject/providers';
import { namehash as ensNameHash, encodeContenthash } from '@ensdomains/ui';
import { ConfigurePOAPsModal } from './partials/ConfigurePOAPsModal';
import { NFTSelectorModal } from './partials/NFTSelectorModal';
import { StyledInputWrapper } from '../Input';
import { ReorderGroup } from '../ReorderGroup';
import { ReorderInput } from '../ReorderInput';
import { PoapField } from './partials/PoapField';
import { TemplatePicker } from '../TemplatePicker/TemplatePicker';
import styled from 'styled-components';
import { NimiSignatureColor } from '../../theme';
import { ImporButton } from '../Button/ImportButton';

export interface CreateNimiProps {
  ensAddress: string;
  ensName: string;
  ensLabelName: string;
  provider: Web3Provider;
}

const TopContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 30px;
`;
const Toplabel = styled.div`
  display: flex;
  margin-bottom: 24px;
  ${NimiSignatureColor};
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  /* identical to box height */

  letter-spacing: -0.02em;
`;
const ImageAndTemplateSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

export function CreateNimi({ ensAddress, ensName, provider }: CreateNimiProps) {
  const location = useLocation();
  const ensMetadata = location.state as ENSMetadata;

  const { loading: loadingLensProfile, defaultProfileData: lensProfile } = useLensDefaultProfileData();
  const { t } = useTranslation('nimi');

  // TODO: UPDATE MODAL STATE HANLING
  const [isAddFieldsModalOpen, setIsAddFieldsModalOpen] = useState(false);
  const [isImportFromTwitterModalOpen, setIsImportFromTwitterModalOpen] = useState(false);
  const [isNFTSelectorModalOpen, setIsNFTSelectorModalOpen] = useState(false);
  const [isPublishNimiModalOpen, setIsPublishNimiModalOpen] = useState(false);
  const [isPOAPModalOpened, setIsPOAPModalOpened] = useState(false);

  /**
   * Publish Nimi state
   * @todo create a reducer or context for this
   */
  const publicResolverContract = useENSPublicResolverContract();
  const [isPublishingNimi, setIsPublishingNimi] = useState(false);
  const [isNimiPublished, setIsNimiPublished] = useState(false);
  const [publishNimiError, setPublishNimiError] = useState<Error>();
  const [publishNimiResponseIpfsHash, setPublishNimiResponseIpfsHash] = useState<string>();
  const [setContentHashTransaction, setSetContentHashTransaction] = useState<ContractTransaction>();
  const [setContentHashTransactionReceipt, setSetContentHashTransactionReceipt] = useState<ContractReceipt>();
  const publishNimiAbortController = useRef<AbortController>();

  const image = ensMetadata?.image
    ? {
        type: NimiImageType.URL,
        url: ensMetadata?.image || '',
      }
    : undefined;

  // Form state manager
  const useFormContext = useForm<Nimi>({
    resolver: yupResolver(nimiValidator),
    defaultValues: {
      displayName: ensName,
      image,
      description: '',
      ensAddress,
      ensName,
      addresses: [],
      links: [],
      widgets: [
        {
          type: NimiWidgetType.POAP,
        },
      ],
    },
  });

  const { register, watch, handleSubmit, setValue, getValues } = useFormContext;

  // To keep the same order of links and addresses, compute
  // the list of blockchain addresses and links from Nimi
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  const formWatchPayload = watch();

  const links = useMemo(() => formWatchPayload.links, [formWatchPayload]);

  const handleImportLensProfile = useCallback(() => {
    if (!lensProfile) return;
    setValue('displayName', lensProfile.name);
    setValue('description', lensProfile.description);
    setValue('image', {
      type: NimiImageType.URL,
      url: lensProfile?.pictureUrl,
    });
  }, [setValue, lensProfile]);

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
  console.log('formwatch', formWatchPayload);
  const onSubmitInvalid = (data) => {
    console.log('SUBMIT INVALID', data);
  };

  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const updateLink = (linkId: string, key: string, value: string) => {
    const updatedLinks = getValues('links').map((link) => (link.id === linkId ? { ...link, [key]: value } : link));

    setValue('links', updatedLinks);
  };

  const removeLink = (linkId: string) =>
    setValue(
      'links',
      getValues('links').filter((link) => link.id !== linkId)
    );

  return (
    <FormProvider {...useFormContext}>
      <InnerWrapper>
        <MainContent showMobile={!showPreviewMobile}>
          <PageSectionTitle>{t('creatingYourProfile')}</PageSectionTitle>
          <Card>
            <CardBody>
              <ImageAndTemplateSection>
                <TopContainer>
                  <Toplabel>Profile Picture</Toplabel>
                  {formWatchPayload.image ? (
                    <ProfileImage src={formWatchPayload.image.url} />
                  ) : (
                    <ProfileImagePlaceholder />
                  )}
                </TopContainer>
                <TopContainer>
                  <Toplabel>Template</Toplabel>
                  <TemplatePicker />
                </TopContainer>
              </ImageAndTemplateSection>
              <TopContainer>
                <Toplabel>Import from</Toplabel>
                <ImportButtonsWrapper>
                  <ImporButton type="Twitter" onClick={() => setIsImportFromTwitterModalOpen(true)} />
                  <ImporButton type="Lens" onClick={handleImportLensProfile} />
                  <ImporButton type="Nft" onClick={() => setIsNFTSelectorModalOpen(true)} />
                </ImportButtonsWrapper>
              </TopContainer>

              <FormWrapper onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
                {/* display name input */}
                <FormGroup>
                  <Label htmlFor="displayName">{t('formLabel.displayName')}</Label>

                  <StyledInputWrapper isSimple>
                    <Input placeholder="Name" id="displayName" {...register('displayName')} />
                  </StyledInputWrapper>
                </FormGroup>
                {/* description input */}
                <FormGroup>
                  <Label htmlFor="description">{t('formLabel.description')}</Label>
                  <StyledInputWrapper isSimple>
                    <TextArea
                      onKeyDown={handleKeyDown}
                      maxLength={300}
                      placeholder="Description"
                      id="description"
                      {...register('description')}
                    />
                  </StyledInputWrapper>
                </FormGroup>
                {/* links */}
                {/* reorder group */}
                {links.length !== 0 && (
                  <ReorderGroup values={links} onReorder={(links) => setValue('links', links)}>
                    {links.map((link) => (
                      <ReorderInput key={link.id!} value={link} updateLink={updateLink} removeLink={removeLink} />
                    ))}
                  </ReorderGroup>
                )}
                {/* addresses */}
                {formWatchPayload.addresses.length > 0 && (
                  <AddresssWrapper>
                    <AddressesTitle>Addresses</AddressesTitle>
                    {formWatchPayload.addresses.map(({ blockchain }, index) => {
                      return (
                        <FormGroup key={'blockchain-input-' + blockchain.toLowerCase()}>
                          <NimiBlockchainField index={index} blockchain={blockchain} />
                        </FormGroup>
                      );
                    })}
                  </AddresssWrapper>
                )}
                {/* template selector */}
                <FormGroup>
                  <Label htmlFor="template">{t('formLabel.template')}</Label>
                  <TemplatePicker />
                </FormGroup>

                {/* add fields button */}
                <FormGroup>
                  {getValues('widgets').some((el) => el.type === NimiWidgetType.POAP) && (
                    <PoapField
                      onConfigure={(e) => {
                        e.stopPropagation();
                        setIsPOAPModalOpened(true);
                      }}
                      onRemove={() =>
                        setValue(
                          'widgets',
                          getValues('widgets').filter((el) => el.type !== NimiWidgetType.POAP)
                        )
                      }
                    />
                  )}
                  <AddFieldsButton type="button" onClick={() => setIsAddFieldsModalOpen(true)}>
                    + {t('buttonLabel.addFields')}
                  </AddFieldsButton>
                </FormGroup>
                {/* publish button */}
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
      {isPOAPModalOpened && (
        <ConfigurePOAPsModal ensAddress={ensAddress} closeModal={() => setIsPOAPModalOpened(false)} />
      )}
      {isAddFieldsModalOpen && (
        <AddFieldsModal
          onClose={() => setIsAddFieldsModalOpen(false)}
          onSubmit={({ link, blockchainAddresse, widget }) => {
            unstable_batchedUpdates(() => {
              setIsAddFieldsModalOpen(false);

              //if link is submitted
              if (link) {
                let newLinksArray: NimiLinkBaseDetails[] = [];
                const linksData = getValues('links');

                newLinksArray = [
                  ...linksData,
                  {
                    id: new Date().valueOf().toString(),
                    type: link,
                    // TODO: Should be updated with NimiLinkType update. Updated naming consistency accross the application with NimiLinkType update.
                    title: '',
                    content: '',
                  },
                ];

                setValue('links', newLinksArray);
              }
              //if address is submitted
              if (blockchainAddresse) {
                let newAddressesArray: NimiBlockchainAddress[] = [];
                const currentAddresses = getValues('addresses');
                newAddressesArray = [...currentAddresses, { blockchain: blockchainAddresse, address: '' }];
                setValue('addresses', newAddressesArray);
              }

              //if widget is submitted
              if (widget) {
                let newWidgets: NimiWidget[] = [];
                const currentWidgets = getValues('widgets');
                newWidgets = [...currentWidgets, { type: widget }];

                setValue('widgets', newWidgets);
              }
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
              setValue('image', { type: NimiImageType.URL, url: data.profileImageUrl });

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
      {isNFTSelectorModalOpen && (
        <NFTSelectorModal
          address={ensAddress}
          onClose={(nftAsset) => {
            if (nftAsset) {
              setValue('image', {
                type: NimiImageType.ERC721,
                contract: nftAsset.assetContract.address,
                tokenId: nftAsset.tokenId as any,
                tokenUri: nftAsset.externalLink,
                url: nftAsset.imageUrl,
              });
            } else {
              setValue('image', undefined);
            }

            setIsNFTSelectorModalOpen(false);
          }}
        />
      )}
    </FormProvider>
  );
}
