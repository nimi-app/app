import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import { encodeContenthash, namehash as ensNameHash } from '@ensdomains/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Nimi,
  NimiBlockchainAddress,
  NimiImageType,
  NimiLinkBaseDetails,
  NimiLinkType,
  NimiThemeType,
  nimiValidator,
  NimiWidget,
  NimiWidgetType,
} from '@nimi.io/card';
import createDebugger from 'debug';
import { useCallback, useMemo, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSignMessage } from 'wagmi';

import PlaceholderMini from '../../assets/images/nimi-placeholder.png';
import daivinityLogoImage from '../../assets/theme/daivinity-logo-image.png';
import daivinityLogoText from '../../assets/theme/daivinity-logo-text.svg';
import daivinityPreview from '../../assets/theme/daivinity-preview.png';
import devconLogoImage from '../../assets/theme/devcon-logo-image.svg';
import devconLogoText from '../../assets/theme/devcon-logo-text.svg';
import devconPreview from '../../assets/theme/devcon-preview.png';
import nimiOGLogoImage from '../../assets/theme/nimi-og-logo-image.png';
import nimiOGLogoText from '../../assets/theme/nimi-og-logo-text.svg';
import nimiOGPreview from '../../assets/theme/nimi-og-preview.png';
import raaveLogoImage from '../../assets/theme/raave-logo-image.png';
import raaveLogoText from '../../assets/theme/raave-logo-text.svg';
import raavePreview from '../../assets/theme/raave-preview.png';
// Partials
import { supportedImageTypes } from '../../constants';
import { useENSPublicResolverContract } from '../../hooks/useENSPublicResolverContract';
import { useLensDefaultProfileData } from '../../hooks/useLensDefaultProfileData';
import { useRainbow } from '../../hooks/useRainbow';
import { setENSNameContentHash } from '../../hooks/useSetContentHash';
import { generateID } from '../../utils';
import { ImporButton } from '../Button/ImportButton';
import { Card, CardBody } from '../Card';
import { FormGroup, Label, TextArea } from '../form';
import { FormWrapper } from '../form/FormGroup';
import { ReorderGroup } from '../ReorderGroup';
import { ContentInput, ReorderInput } from '../ReorderInput';
import { TemplatePickerButton } from '../TemplatePickerButton';
import { publishNimi, publishNimiViaIPNS, uploadImage } from './api';
import { AddFieldsModal } from './partials/AddFieldsModal';
import { ImportButtonsWrapper } from './partials/buttons';
import { ConfigurePOAPsModal } from './partials/ConfigurePOAPsModal';
import { ImportFromTwitterModal } from './partials/ImportFromTwitterModal';
import { ImportFromLinktreeModal } from './partials/LinktreeModal';
import { NFTSelectorModal } from './partials/NFTSelectorModal';
import { NimiBlockchainField } from './partials/NimiBlockchainField';
import { NimiPreviewCard } from './partials/NimiPreviewCard';
import { PoapField } from './partials/PoapField';
import { PublishNimiModal } from './partials/PublishNimiModal';
import { TemplatePickerModal } from './partials/TemplatePickerModal';
import {
  AddFieldsButton,
  BackButton,
  BlockchainAddresses,
  ErrorMessage,
  FileInput,
  FormItem,
  ImageAndTemplateSection,
  ImportButton,
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

const themes = {
  [NimiThemeType.NIMI]: {
    type: NimiThemeType.NIMI,
    logoImage: nimiOGLogoImage,
    logoText: nimiOGLogoText,
    preview: nimiOGPreview,
  },
  [NimiThemeType.DEVCON]: {
    type: NimiThemeType.DEVCON,
    logoImage: devconLogoImage,
    logoText: devconLogoText,
    preview: devconPreview,
  },
  [NimiThemeType.RAAVE]: {
    type: NimiThemeType.RAAVE,
    logoImage: raaveLogoImage,
    logoText: raaveLogoText,
    preview: raavePreview,
  },
  [NimiThemeType.DAIVINITY]: {
    type: NimiThemeType.DAIVINITY,
    logoImage: daivinityLogoImage,
    logoText: daivinityLogoText,
    preview: daivinityPreview,
  },
  // [NimiThemeType.INFINITE]: {
  //   type: NimiThemeType.RAAVE,
  //   logoImage: raaveLogoImage,
  //   logoText: raaveLogoText,
  //   preview: devconPreview,
  // },
};

export interface CreateNimiProps {
  ensAddress: string;
  ensName: string;
  /**
   * Web3 provider
   */
  provider: Web3Provider;
  /**
   * Available themes for the user to choose from
   */
  availableThemes: NimiThemeType[];
  /**
   * The initial Nimi to edit
   */
  initialNimi?: Nimi;
}

const debug = createDebugger('Nimi:CreateNimi');

export function CreateNimi({ ensAddress, ensName, provider, availableThemes, initialNimi }: CreateNimiProps) {
  const { loading: loadingLensProfile, defaultProfileData: lensProfile } = useLensDefaultProfileData();
  const { t } = useTranslation('nimi');
  const { chainId } = useRainbow();
  const { signMessageAsync } = useSignMessage();

  // TODO: UPDATE MODAL STATE HANLING
  const [isAddFieldsModalOpen, setIsAddFieldsModalOpen] = useState(false);
  const [isImportFromTwitterModalOpen, setIsImportFromTwitterModalOpen] = useState(false);
  const [isNFTSelectorModalOpen, setIsNFTSelectorModalOpen] = useState(false);
  const [isPublishNimiModalOpen, setIsPublishNimiModalOpen] = useState(false);
  const [isLinktreeOpen, setIsLinktreeOpen] = useState(false);
  const [isPOAPModalOpened, setIsPOAPModalOpened] = useState(false);
  const [isTemplatePickerModalOpened, setIsTemplatePickerModalOpened] = useState(false);

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

  // Form state manager
  const useFormContext = useForm<Nimi>({
    resolver: yupResolver(nimiValidator),
    defaultValues: {
      ...initialNimi,
      theme: {
        type: availableThemes.length !== 0 ? availableThemes[0] : NimiThemeType.NIMI,
      },
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

  function handleThemeSelection({ type }) {
    setValue('theme', { type });
    setIsTemplatePickerModalOpened(false);
  }

  /**
   * Handle the form submit via ENS contract interaction
   * @param data a validated Nimi object
   */
  const onSubmitValid = async (nimi: Nimi) => {
    unstable_batchedUpdates(() => {
      setIsPublishNimiModalOpen(true);
      setIsPublishingNimi(true);
      setPublishNimiError(undefined);
      setIsNimiPublished(false);
    });

    try {
      if (!publicResolverContract) {
        throw new Error('ENS Public Resolver contract is not available.');
      }

      publishNimiAbortController.current = new AbortController();

      const signature = await signMessageAsync({ message: JSON.stringify(nimi) });

      let contentHash: string | undefined;
      let cid: string | undefined;

      // In development, use IPFS
      if (process.env.REACT_APP_ENV === 'production') {
        const { cidV1, ipns } = await publishNimiViaIPNS({
          nimi,
          signature,
          chainId: 1, // always mainnet
          controller: publishNimiAbortController.current,
        });

        if (!cidV1) {
          throw new Error('No CID returned from publishNimiViaIPNS');
        }

        cid = cidV1;
        contentHash = `ipns://${ipns}`;
      } else {
        cid = (
          await publishNimi({
            nimi,
            chainId: provider.network.chainId,
            controller: publishNimiAbortController.current,
          })
        ).cid;
        contentHash = `ipns://${cid}`;
      }

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
      setPublishNimiResponseIpfsHash(cid);
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

  const onSubmitInvalid = (data) => {
    debug('onSubmitInvalid', {
      data,
    });
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
        const { cidV1 } = await uploadImage(file);

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
                      selectedTheme={themes[getValues('theme').type]}
                      onClick={() => setIsTemplatePickerModalOpened(true)}
                    />
                  </TemplateSection>
                  <ImportSection>
                    <Toplabel>Import from</Toplabel>
                    <ImportButtonsWrapper>
                      <ImporButton type="Twitter" onClick={() => setIsImportFromTwitterModalOpen(true)} />
                      {!loadingLensProfile && !!lensProfile && (
                        <ImporButton type="Lens" onClick={handleImportLensProfile} />
                      )}
                      <ImporButton type="Linktree" onClick={() => setIsLinktreeOpen(true)} />
                      <ImporButton type="Nft" onClick={() => setIsNFTSelectorModalOpen(true)} />
                    </ImportButtonsWrapper>
                  </ImportSection>
                </TemplateImportContainer>
              </ImageAndTemplateSection>

              <FormWrapper onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
                {/* display name input */}
                <FormGroup>
                  <FormItem>
                    <Label htmlFor="displayName">{t('formLabel.displayName')}</Label>
                    <ContentInput
                      inputInvalid={false}
                      paddingLeft={'20px'}
                      placeholder="Name"
                      id="displayName"
                      {...register('displayName')}
                    />
                  </FormItem>
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
                {links?.length !== 0 && links !== undefined && (
                  <ReorderGroup values={links} onReorder={(links) => setValue('links', links)}>
                    {links.map((link) => (
                      <ReorderInput key={link.id!} value={link} updateLink={updateLink} removeLink={removeLink} />
                    ))}
                  </ReorderGroup>
                )}
                {/* addresses */}
                {formWatchPayload.addresses.length > 0 && (
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
                {/* add fields button */}
                <AddFieldsButton type="button" onClick={() => setIsAddFieldsModalOpen(true)}>
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
      {isPOAPModalOpened && (
        <ConfigurePOAPsModal ensAddress={ensAddress} closeModal={() => setIsPOAPModalOpened(false)} />
      )}
      {isTemplatePickerModalOpened && (
        <TemplatePickerModal
          themes={availableThemes.map((availableTheme) => themes[availableTheme])}
          handleThemeSelection={handleThemeSelection}
          closeModal={() => setIsTemplatePickerModalOpened(false)}
        />
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
          setContentHashTransactionChainId={chainId as number}
          cancel={() => {
            setIsPublishNimiModalOpen(false);
            publishNimiAbortController?.current?.abort();
          }}
        />
      )}
      {isLinktreeOpen && (
        <ImportFromLinktreeModal
          onClose={(linktreeLinks) => {
            if (linktreeLinks) setValue('links', [...linktreeLinks, ...links]);
            setIsLinktreeOpen(false);
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
