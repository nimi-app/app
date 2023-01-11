import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts';

import { encodeContenthash, namehash as ensNameHash } from '@ensdomains/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Nimi,
  NimiBlockchainAddress,
  NimiImageType,
  NimiLinkBaseDetails,
  NimiLinkType,
  NimiThemeType,
  NimiWidget,
  NimiWidgetType,
} from '@nimi.io/card/types';
import { nimiValidator } from '@nimi.io/card/validators';
import createDebugger from 'debug';
import { useAtom } from 'jotai';
import { KeyboardEventHandler, useCallback, useMemo, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSignMessage } from 'wagmi';

import { usePublishNimiIPNS } from '../../api/RestAPI/hooks/usePublishNimiIPNS';
import { useUploadImageToIPFS } from '../../api/RestAPI/hooks/useUploadImageToIPFS';
import PlaceholderMini from '../../assets/images/nimi-placeholder.png';
// Partials
import { supportedImageTypes } from '../../constants';
import { useENSPublicResolverContract } from '../../hooks/useENSPublicResolverContract';
import { useLensDefaultProfileData } from '../../hooks/useLensDefaultProfileData';
import { useRainbow } from '../../hooks/useRainbow';
import { setENSNameContentHash } from '../../hooks/useSetContentHash';
import {
  AddFieldsModal,
  ConfigurePOAPsModal,
  ImportFromLinktreeModal,
  ImportFromTwitterModal,
  NFTSelectorModal,
  PublishNimiModal,
  TemplatePickerModal,
} from '../../modals';
import { modalOpenedAtom, ModalTypes } from '../../state';
import { NimiCuratedTheme } from '../../types';
import { generateID } from '../../utils';
import { ImporButton, ImportButtonType } from '../Button/ImportButton';
import { Card, CardBody } from '../Card';
import { FormGroup, Label, TextArea } from '../form';
import { FormWrapper } from '../form/FormGroup';
import { ReorderGroup } from '../ReorderGroup';
import { ReorderInput } from '../ReorderInput';
import { TemplatePickerButton } from '../TemplatePickerButton';
import { NimiBlockchainField } from './partials/NimiBlockchainField';
import { NimiPreviewCard } from './partials/NimiPreviewCard';
import { PoapField } from './partials/PoapField';
import {
  AddFieldsButton,
  BackButton,
  BlockchainAddresses,
  ErrorMessage,
  FileInput,
  FormItem,
  ImageAndTemplateSection,
  ImportButton,
  ImportButtonsWrapper,
  ImportSection,
  InnerWrapper,
  MainContent,
  PageSectionTitle,
  PreviewContent,
  PreviewMobile,
  ProfileImage,
  ProfilePictureContainer,
  SaveAndDeployButton,
  TemplateImportContainer,
  TemplateSection,
  Toplabel,
} from './styled';
import { themes } from './themes';

export interface CreateNimiProps {
  ensAddress: string;
  ensName: string;
  availableThemes: NimiCuratedTheme[];
  initialNimi: Nimi;
}

const debug = createDebugger('Nimi:CreateNimi');

export function CreateNimi({ ensAddress, ensName, availableThemes, initialNimi }: CreateNimiProps) {
  const [modalOpened, setModalOpened] = useAtom(modalOpenedAtom);

  const { loading: loadingLensProfile, defaultProfileData: lensProfile } = useLensDefaultProfileData();
  const { mutateAsync: publishNimiAsync } = usePublishNimiIPNS();
  const { mutateAsync: uploadImageAsync } = useUploadImageToIPFS();

  const { t } = useTranslation('nimi');
  const { chainId } = useRainbow();
  const { signMessageAsync } = useSignMessage();

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
  const [imgErrorMessage, setImgErrorMessage] = useState('');
  const publishNimiAbortController = useRef<AbortController>();

  debug({ initialNimi });

  // Form state manager
  const useFormContext = useForm<Nimi>({
    resolver: yupResolver(nimiValidator),
    defaultValues: {
      ...initialNimi,
    },
  });

  const { register, watch, handleSubmit, setValue, getValues } = useFormContext;

  // To keep the same order of links and addresses, compute
  // the list of blockchain addresses and links from Nimi
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  const [customImg, setCustomImg] = useState<any>(null);

  const formWatchPayload = watch();

  const links = useMemo(() => (formWatchPayload === undefined ? [] : formWatchPayload.links), [formWatchPayload]);

  const handleImportLensProfile = useCallback(() => {
    if (!lensProfile) return;
    setValue('displayName', lensProfile.name);
    setValue('description', lensProfile.description);
    setValue('image', {
      type: NimiImageType.URL,
      url: lensProfile?.pictureUrl,
    });
  }, [setValue, lensProfile]);

  function handleThemeSelection({ type }: { type: NimiThemeType }) {
    setValue('theme', { type });
    setModalOpened(null);
  }

  /**
   * Handle the form submit via ENS contract interaction
   * @param data a validated Nimi object
   */
  const onSubmitValid = async (nimi: Nimi) => {
    unstable_batchedUpdates(() => {
      setModalOpened(ModalTypes.PUBLISH_NIMI);
      setIsPublishingNimi(true);
      setPublishNimiError(undefined);
      setIsNimiPublished(false);
    });

    try {
      if (!publicResolverContract) {
        throw new Error('ENS Public Resolver contract is not available.');
      }

      const signature = await signMessageAsync({ message: JSON.stringify(nimi) });

      const { cidV1, ipns } = await publishNimiAsync({
        nimi,
        signature,
        chainId: 1, // always mainnet
      });

      if (!cidV1) {
        throw new Error('No CID returned from publishNimiViaIPNS');
      }

      const contentHash = `ipns://${ipns}`;

      // Get current content hash from ENS contract
      const currentContentHashEncoded = await publicResolverContract.contenthash(ensNameHash(ensName));
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
      setPublishNimiResponseIpfsHash(cidV1);
      const setContentHashTransaction = await setENSNameContentHash({
        contract: publicResolverContract,
        name: nimi.ensName,
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
      debug({
        error,
      });
      unstable_batchedUpdates(() => {
        setIsPublishingNimi(false);
        setPublishNimiError(error);
      });
    }
  };

  const onSubmitInvalid = (data: any) => {
    debug('onSubmitInvalid', {
      data,
    });
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const eventTarget = e.target as HTMLTextAreaElement;

    eventTarget.style.height = 'inherit';
    eventTarget.style.height = `${eventTarget.scrollHeight}px`;
  };

  const updateLink = (linkId: string, key: string, value: string) => {
    let url = value;
    if (key === 'content') {
      url = value.startsWith('http') === false ? 'https://' + url : url;
      value = url;
    }
    const updatedLinks = getValues('links').map((link) => (link.id === linkId ? { ...link, [key]: value } : link));

    setValue('links', updatedLinks);
  };

  const removeLink = (linkId: string) =>
    setValue(
      'links',
      getValues('links').filter((link) => link.id !== linkId)
    );

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];

      if (file.size > 2000000) {
        setImgErrorMessage('File too big! Max size: 2mb');
        setTimeout(() => {
          setImgErrorMessage('');
        }, 5000);
        return;
      }
      if (!supportedImageTypes.includes(file.type)) {
        setImgErrorMessage('File type unsupported!');

        setTimeout(() => {
          setImgErrorMessage('');
        }, 5000);

        return;
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        setCustomImg([reader.result]);
      };

      try {
        const { cidV1 } = await uploadImageAsync(file);

        setValue('image', {
          type: NimiImageType.URL,
          url: `https://ipfs.io/ipfs/${cidV1}`,
        });
      } catch (error) {
        debug({
          error,
        });
        setImgErrorMessage('Network Error');
        setTimeout(() => {
          setImgErrorMessage('');
        }, 5000);
      }
    }
  };

  return (
    <FormProvider {...useFormContext}>
      <InnerWrapper>
        <MainContent showMobile={!showPreviewMobile}>
          <PageSectionTitle>{t('creatingYourProfile')}</PageSectionTitle>
          <Card>
            <CardBody>
              <ImageAndTemplateSection>
                <ProfilePictureContainer>
                  <Toplabel>Profile Picture</Toplabel>
                  <ProfileImage
                    src={
                      customImg ? customImg : formWatchPayload.image?.url ? formWatchPayload.image.url : PlaceholderMini
                    }
                  />
                  {imgErrorMessage && <ErrorMessage>{imgErrorMessage}</ErrorMessage>}
                  <ImportButton>
                    <FileInput name="myfile" type="file" onChange={handleUpload} />
                    Change Profile Picture
                  </ImportButton>
                </ProfilePictureContainer>
                <TemplateImportContainer>
                  <TemplateSection>
                    <Toplabel>Template</Toplabel>
                    <TemplatePickerButton
                      selectedTheme={themes[getValues('theme').type as keyof typeof themes]}
                      onClick={() => setModalOpened(ModalTypes.TEMPLATE_PICKER)}
                    />
                  </TemplateSection>
                  <ImportSection>
                    <Toplabel>Import from</Toplabel>
                    <ImportButtonsWrapper>
                      <ImporButton
                        type={ImportButtonType.Twitter}
                        onClick={() => setModalOpened(ModalTypes.IMPORT_FROM_TWITTER)}
                      />
                      {!loadingLensProfile && !!lensProfile && (
                        <ImporButton type={ImportButtonType.Lens} onClick={handleImportLensProfile} />
                      )}
                      <ImporButton
                        type={ImportButtonType.Linktree}
                        onClick={() => setModalOpened(ModalTypes.IMPORT_FROM_LINKTREE)}
                      />
                      <ImporButton
                        type={ImportButtonType.Nft}
                        onClick={() => setModalOpened(ModalTypes.NFT_SELECTOR)}
                      />
                    </ImportButtonsWrapper>
                  </ImportSection>
                </TemplateImportContainer>
              </ImageAndTemplateSection>

              <FormWrapper onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
                <FormGroup>
                  <FormItem>
                    <Label htmlFor="description">{t('formLabel.description')}</Label>
                    <TextArea
                      onKeyDown={handleKeyDown}
                      maxLength={300}
                      placeholder="Description"
                      id="description"
                      {...register('description')}
                    />
                  </FormItem>
                </FormGroup>
                {/* links */}
                {/* reorder group */}
                {links !== undefined && links?.length > 0 && (
                  <ReorderGroup values={links} onReorder={(links) => setValue('links', links)}>
                    {links.map((link) => (
                      <ReorderInput key={link.id!} value={link} updateLink={updateLink} removeLink={removeLink} />
                    ))}
                  </ReorderGroup>
                )}
                {/* addresses */}
                {formWatchPayload !== undefined &&
                  'address' in formWatchPayload === true &&
                  formWatchPayload.addresses !== undefined &&
                  formWatchPayload?.addresses?.length > 0 && (
                    <FormGroup>
                      <FormItem>
                        <Label>Addresses</Label>
                        <BlockchainAddresses>
                          {formWatchPayload.addresses.map(({ blockchain }, index) => {
                            return (
                              <NimiBlockchainField
                                key={'blockchain-input-' + blockchain.toLowerCase()}
                                index={index}
                                blockchain={blockchain}
                              />
                            );
                          })}
                        </BlockchainAddresses>
                      </FormItem>
                    </FormGroup>
                  )}
                {/* widgets */}
                {getValues('widgets').some((el) => el.type === NimiWidgetType.POAP) && (
                  <PoapField
                    onConfigure={(e) => {
                      e.stopPropagation();
                      setModalOpened(ModalTypes.CONFIGURE_POAPS);
                    }}
                    onRemove={() =>
                      setValue(
                        'widgets',
                        getValues('widgets').filter((el) => el.type !== NimiWidgetType.POAP)
                      )
                    }
                  />
                )}
                {/* add fields button */}
                <AddFieldsButton type="button" onClick={() => setModalOpened(ModalTypes.ADD_FIELDS)}>
                  + {t('buttonLabel.addFields')}
                </AddFieldsButton>
                {/* publish button */}

                <SaveAndDeployButton type="submit">{t('publishSite')}</SaveAndDeployButton>

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

      {modalOpened === ModalTypes.CONFIGURE_POAPS && (
        <ConfigurePOAPsModal ensAddress={ensAddress} closeModal={() => setModalOpened(null)} />
      )}

      {modalOpened === ModalTypes.TEMPLATE_PICKER && (
        <TemplatePickerModal
          themes={availableThemes.map((availableTheme) => themes[availableTheme])}
          handleThemeSelection={handleThemeSelection}
          closeModal={() => setModalOpened(null)}
        />
      )}

      {modalOpened === ModalTypes.ADD_FIELDS && (
        <AddFieldsModal
          onClose={() => setModalOpened(null)}
          onSubmit={({ link, blockchainAddresse, widget }) => {
            setModalOpened(null);

            //if link is submitted
            if (link) {
              let newLinksArray: NimiLinkBaseDetails[] = [];
              const linksData = getValues('links');

              newLinksArray = [
                ...linksData,
                {
                  id: generateID(),
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
          }}
        />
      )}

      {modalOpened === ModalTypes.IMPORT_FROM_TWITTER && (
        <ImportFromTwitterModal
          onClose={() => setModalOpened(null)}
          onDataImport={(data) => {
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

            setModalOpened(null);
          }}
        />
      )}

      {modalOpened === ModalTypes.PUBLISH_NIMI && (
        <PublishNimiModal
          ensName={ensName}
          ipfsHash={publishNimiResponseIpfsHash}
          isPublishing={isPublishingNimi}
          isPublished={isNimiPublished}
          publishError={publishNimiError}
          setContentHashTransaction={setContentHashTransaction}
          setContentHashTransactionReceipt={setContentHashTransactionReceipt}
          setContentHashTransactionChainId={chainId as number}
          cancel={() => {
            setModalOpened(null);
            publishNimiAbortController?.current?.abort();
          }}
        />
      )}

      {modalOpened === ModalTypes.IMPORT_FROM_LINKTREE && (
        <ImportFromLinktreeModal
          onClose={(linktreeNimi) => {
            setModalOpened(null);

            if (!linktreeNimi) return;

            if (linktreeNimi.links && linktreeNimi.links.length > 0) {
              setValue('links', [...linktreeNimi.links, ...links]);
            }

            // NFT avatar
            if (linktreeNimi.image && linktreeNimi.image.type === NimiImageType.ERC721) {
              setValue('image', linktreeNimi.image);
            }
          }}
        />
      )}

      {modalOpened === ModalTypes.NFT_SELECTOR && (
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
            }

            setModalOpened(null);
          }}
        />
      )}
    </FormProvider>
  );
}
