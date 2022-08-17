import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { unstable_batchedUpdates } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useMemo, useRef, useState, useCallback } from 'react';
import { ContractTransaction, ContractReceipt } from '@ethersproject/contracts';
import { ReactComponent as PoapLogo } from '../../assets/svg/poap-logo.svg';

import { Nimi, nimiCard, NimiBlockchain, NimiLinkType, NimiLinkBaseDetails, NimiWidgetType } from 'nimi-card';
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
  PoapButton,
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
import { craeteBonfidaRegistry, setBonfidaContentHash, setENSNameContentHash } from '../../hooks/useSetContentHash';
import { useENSPublicResolverContract } from '../../hooks/useENSPublicResolverContract';
import { PublishNimiModal } from './partials/PublishNimiModal';
import { useLensDefaultProfileData } from '../../hooks/useLensDefaultProfileData';
import { publishNimi } from './api';
import { useConnection } from '@solana/wallet-adapter-react';
import { ActiveNetworkState, useActiveNetwork } from '../../context/ActiveNetwork';
import { useSolana } from '../../context/SolanaProvider';

export interface CreateNimiProps {
  userAddress: string;
  ensName: string;
  ensLabelName: string;
}

export function CreateNimi({ userAddress, ensName }: CreateNimiProps) {
  /**
   * @todo replace this API
   */
  const [isAddFieldsModalOpen, setIsAddFieldsModalOpen] = useState(false);
  const [isImportFromTwitterModalOpen, setIsImportFromTwitterModalOpen] = useState(false);
  const location = useLocation();
  const ensMetadata = location.state as ENSMetadata;

  const { connection } = useConnection();
  const { activeNetwork } = useActiveNetwork();
  const { publicKey } = useSolana();

  const { loading: loadingLensProfile, defaultProfileData: lensProfile } = useLensDefaultProfileData(userAddress);

  const { t } = useTranslation('nimi');
  console.log('hree');
  /**
   * Publish Nimi state
   * @todo create a reducer or context for this
   */
  console.log('ensName,', ensName);
  const publicResolverContract = useENSPublicResolverContract();
  const [isPublishNimiModalOpen, setIsPublishNimiModalOpen] = useState(false);
  const [isPublishingNimi, setIsPublishingNimi] = useState(false);
  const [publishNimiError, setPublishNimiError] = useState<Error>();
  const [publishNimiResponseIpfsHash, setPublishNimiResponseIpfsHash] = useState<string>();
  const [setContentHashTransaction, setSetContentHashTransaction] = useState<ContractTransaction>();
  const [setContentHashTransactionReceipt, setSetContentHashTransactionReceipt] = useState<ContractReceipt>();
  const [solanaTransaction, setSolanaTransaction] = useState();
  const publishNimiAbortController = useRef<AbortController>();
  console.log('ensName,', ensName);
  // Form state manager
  const useFormContext = useForm<Nimi>({
    resolver: yupResolver(nimiCard),
    defaultValues: {
      displayName: ensName,
      displayImageUrl: ensMetadata?.image,
      description: '',
      ensAddress: userAddress,
      ensName,
      addresses: [],
      links: [],
      widgets:
        activeNetwork === ActiveNetworkState.SOLANA
          ? []
          : [
              {
                type: NimiWidgetType.POAP,
                address: userAddress,
              },
            ],
    },
  });

  const { register, watch, handleSubmit, setValue, getValues } = useFormContext;

  // Manages the links blockchain address list
  const [formLinkList, setFormLinkList] = useState<NimiLinkType[]>([]);
  const [formAddressList, setFormAddressList] = useState<NimiBlockchain[]>([]);
  const [formWidgetList, setFormWidgetList] = useState<NimiWidgetType[]>([NimiWidgetType.POAP]);
  // To keep the same order of links and addresses, compute
  // the list of blockchain addresses and links from Nimi
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const selectedBlockchainAddressFieldList = useMemo(
    () => Object.values(NimiBlockchain).filter((blockchain) => formAddressList.includes(blockchain)),
    [formAddressList]
  );

  const selectedLinkFieldList = useMemo(
    () => Object.keys(NimiLinkType).filter((link) => formLinkList.includes(link as NimiLinkType)),
    [formLinkList]
  );

  const formWatchPayload = watch();

  const handleImportLensProfile = useCallback(() => {
    if (!lensProfile) return;
    setValue('displayName', lensProfile.name);
    setValue('description', lensProfile.description);
    setValue('displayImageUrl', lensProfile?.pictureUrl);
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
    });

    try {
      publishNimiAbortController.current = new AbortController();

      const { cid } = await publishNimi(data, publishNimiAbortController.current);

      if (!cid) {
        throw new Error('No CID returned from publishNimi');
      }

      // Set the content
      setPublishNimiResponseIpfsHash(cid);
      if (activeNetwork === ActiveNetworkState.SOLANA) {
        const signature = await craeteBonfidaRegistry(connection, ensName, publicKey);
        console.log('bonfidaContentHash', signature);
        // if (signature) {
        //   setSolanaTransaction(signature);
        //   const recepit = await connection.sendRawTransaction(signature);

        //   console.log('recepit', recepit);
        // }
        const signature2 = await setBonfidaContentHash(cid, connection, ensName, publicKey);

        const recepit = await connection.getSignatureStatus(signature2);
        console.log(recepit);
        await setTimeout(() => {
          setSolanaTransaction(signature2);
          setIsPublishingNimi(false);
        }, 38000);
      } else {
        if (!publicResolverContract) {
          throw new Error('ENS Public Resolver contract is not available.');
        }
        const contentHashTransaction = await setENSNameContentHash({
          contract: publicResolverContract,
          name: data.ensName,
          contentHash: `ipfs://${cid}`,
        });

        setSetContentHashTransaction(contentHashTransaction);

        const setContentHashTransactionReceipt = await contentHashTransaction.wait();

        unstable_batchedUpdates(() => {
          setSetContentHashTransactionReceipt(setContentHashTransactionReceipt);
          setIsPublishingNimi(false);
        });
      }
    } catch (error) {
      console.error(error);
      unstable_batchedUpdates(() => {
        setIsPublishingNimi(false);
        setPublishNimiError(error);
      });
    }
  };
  console.log('ensName,', ensName);
  const onSubmitInvalid = (data) => {
    console.log(data);
  };
  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  console.log('ensName,', ensName);

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
                  {/* <span  role="textbox" contenteditable  {...register('description')}></span> */}
                </FormGroup>

                {selectedLinkFieldList.map((link) => {
                  const label = t(`formLabel.${link.toLowerCase()}`);

                  return (
                    <LinkFormGroup key={'blockchain-input-' + link}>
                      <NimiLinkField key={'link-input' + link} label={label} link={link as NimiLinkType} />
                    </LinkFormGroup>
                  );
                })}
                {selectedBlockchainAddressFieldList.map((blockchain) => {
                  const label = t(`formLabel.${blockchain.toLowerCase()}`);
                  console.log('link', blockchain);
                  return (
                    <FormGroup key={'blockchain-input-' + blockchain.toLowerCase()}>
                      <NimiBlockchainField label={label} blockchain={blockchain} />
                    </FormGroup>
                  );
                })}

                <FormGroup>
                  {formWidgetList.includes(NimiWidgetType.POAP) && activeNetwork === ActiveNetworkState.ETHEREUM && (
                    <PoapButton>
                      <PoapLogo />
                      POAPs
                    </PoapButton>
                  )}
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
            links: formLinkList,
            blockchainAddresses: formAddressList,
            widgets: formWidgetList,
          }}
          onClose={() => setIsAddFieldsModalOpen(false)}
          onSubmit={({ links, blockchainAddresses, widgets }) => {
            unstable_batchedUpdates(() => {
              setIsAddFieldsModalOpen(false);
              const arrayOfLinkItemsToBeRemoved = formLinkList.filter((item) => !links.includes(item));
              if (arrayOfLinkItemsToBeRemoved.length > 0) {
                const formData = getValues('links');
                const newArray = formData.filter((item) => !arrayOfLinkItemsToBeRemoved.includes(item.type));
                if (newArray) setValue('links', newArray);
              }

              const arrayOfAddressItemsToBeRemoved = formAddressList.filter(
                (item) => !blockchainAddresses.includes(item)
              );
              if (arrayOfAddressItemsToBeRemoved.length > 0) {
                const formData = getValues('addresses');
                const newArray = formData.filter((item) => !arrayOfAddressItemsToBeRemoved.includes(item.blockchain));
                if (newArray) setValue('addresses', newArray);
              }

              // const arrayOfWidgetsItemsToBeRemoved = formWidgetList.filter((item) => !nimiWidgetList.includes(item));
              // if (arrayOfWidgetsItemsToBeRemoved.length > 0) {
              //   const formData = getValues('widgets');
              //   const newArray = formData.filter((item) => !arrayOfWidgetsItemsToBeRemoved.includes(item.type));
              console.log('widnger');
              if (ActiveNetworkState.ETHEREUM === activeNetwork) {
                setValue(
                  'widgets',
                  widgets.map((widget) => {
                    if (widget === NimiWidgetType.POAP) {
                      return {
                        type: NimiWidgetType.POAP,
                        address: userAddress,
                      };
                    }

                    return widget;
                  })
                );
              }

              setFormLinkList(links);
              setFormAddressList(blockchainAddresses);
              setFormWidgetList(widgets);
            });
          }}
        />
      )}
      {isImportFromTwitterModalOpen && (
        <ImportFromTwitterModal
          onClose={() => setIsImportFromTwitterModalOpen(false)}
          onDataImport={(data) => {
            unstable_batchedUpdates(() => {
              const label = t(`formLabel.twitter`);
              // Set the fields and close the modal
              setValue('displayName', data.name);
              setValue('description', data.description);
              setValue('displayImageUrl', data.profileImageUrl);
              const hasTwitter = formLinkList.some((element) => element === NimiLinkType.TWITTER);
              if (!hasTwitter) setFormLinkList([...formLinkList, NimiLinkType.TWITTER]);

              const prevLinkState = getValues('links') || [];

              const hasLink = prevLinkState.some((prevLink) => prevLink.type === NimiLinkType.TWITTER);
              const newState: NimiLinkBaseDetails[] = hasLink
                ? prevLinkState.map((curr) => {
                    if (curr.type === NimiLinkType.TWITTER) {
                      return { ...curr, content: data.username };
                    }

                    return curr;
                  })
                : [...prevLinkState, { type: NimiLinkType.TWITTER, label, content: data.username }];

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
          publishError={publishNimiError}
          solanaSignature={solanaTransaction}
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
