import { ContractReceipt } from '@ethersproject/contracts';

import { encodeContenthash, namehash as ensNameHash } from '@ensdomains/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { Nimi, NimiImageType, NimiLinkType, NimiWidget, NimiWidgetType } from '@nimi.io/card/types';
import { nimiValidator } from '@nimi.io/card/validators';
import createDebugger from 'debug';
import { KeyboardEventHandler, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSignMessage } from 'wagmi';

import { PoapField } from './partials/PoapField';
import { BlockchainAddresses, FormItem, InnerWrapper, MainContent, PageSectionTitle } from './styled';
import { themes } from './themes';
import { usePublishNimiIPNS } from '../../api/RestAPI/hooks/usePublishNimiIPNS';
import { useENSPublicResolverContract } from '../../hooks/useENSPublicResolverContract';
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
import { useUserInterface } from '../../services/useUserInterface';
import { NimiCuratedTheme } from '../../types';
import { generateID } from '../../utils';
import { AddFieldsButton } from '../AddFieldsButton';
import { Card, CardBody } from '../Card';
import { FormGroup, Label, TextArea } from '../form';
import { FormWrapper } from '../form/FormGroup';
import { NimiBlockchainField, ReorderInput } from '../Input';
import { NimiPreview } from '../NimiPreview';
import { PreviewMobileButton } from '../PreviewMobileButton';
import { ProfileSettings } from '../ProfileSettings';
import { PublishNimiButton } from '../PublishNimiButton';
import { ReorderGroup } from '../ReorderGroup';

const debug = createDebugger('Nimi:CreateNimi');

export interface CreateNimiProps {
  ensAddress: string;
  ensName: string;
  availableThemes: NimiCuratedTheme[];
  initialNimi: Nimi;
}

export function CreateNimi({ ensName, availableThemes, initialNimi }: CreateNimiProps) {
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const { account: ensAddress } = useRainbow();

  const { modalOpened, ModalTypes, openModal, closeModal, showSpinner, hideSpinner } = useUserInterface();

  const [isNimiPublished, setIsNimiPublished] = useState(false);
  const [publishNimiError, setPublishNimiError] = useState<Error>();
  const [publishNimiResponseIpfsHash, setPublishNimiResponseIpfsHash] = useState<string>();
  const [setContentHashTransactionReceipt, setSetContentHashTransactionReceipt] = useState<ContractReceipt>();

  const { mutateAsync: publishNimiAsync } = usePublishNimiIPNS();

  const { t } = useTranslation('nimi');
  const { signMessageAsync } = useSignMessage();

  const publicResolverContract = useENSPublicResolverContract();

  debug({ initialNimi });

  const useFormContext = useForm<Nimi>({
    resolver: yupResolver(nimiValidator),
    defaultValues: {
      ...initialNimi,
    },
    mode: 'onTouched',
  });

  const { register, watch, handleSubmit, setValue, getValues, control } = useFormContext;

  const {
    fields: linkFields,
    prepend: addLinkToStart,
    remove: removeLink,
    replace: replaceLink,
    update: updateLink,
  } = useFieldArray({
    control: control,
    name: 'links',
    keyName: 'linkId',
  });

  const {
    fields: blockchainAddressFields,
    prepend: addBlockchainAddressToStart,
    remove: removeBlockchainAddress,
    update: updateBlockchainAddress,
  } = useFieldArray({
    control: control,
    name: 'addresses',
    keyName: 'blockchainAddressId',
  });

  const formWatchPayload = watch();

  console.log('FWP', formWatchPayload);

  const onSubmitValid = async (nimi: Nimi) => {
    showSpinner();

    setPublishNimiError(undefined);
    setIsNimiPublished(false);

    try {
      if (!publicResolverContract) {
        throw new Error('ENS Public Resolver contract is not available.');
      }

      const signature = await signMessageAsync({ message: JSON.stringify(nimi) });

      const { cidV1, ipns } = await publishNimiAsync({
        nimi,
        signature,
        chainId: 1,
      });

      if (!cidV1) {
        throw new Error('No CID returned from publishNimiViaIPNS');
      }

      const currentContentHashEncoded = await publicResolverContract.contenthash(ensNameHash(ensName));

      const contentHash = `ipns://${ipns}`;
      const newContentHashEncoded = encodeContenthash(contentHash).encoded as unknown as string;

      if (currentContentHashEncoded === newContentHashEncoded) {
        setIsNimiPublished(true);
        openModal(ModalTypes.PUBLISH_NIMI);
        hideSpinner();

        return;
      }

      setPublishNimiResponseIpfsHash(cidV1);

      const setContentHashTransaction = await setENSNameContentHash({
        contract: publicResolverContract,
        name: nimi.ensName,
        contentHash,
      });

      const setContentHashTransactionReceipt = await setContentHashTransaction.wait();

      setSetContentHashTransactionReceipt(setContentHashTransactionReceipt);
      setIsNimiPublished(true);
      openModal(ModalTypes.PUBLISH_NIMI);
      hideSpinner();
    } catch (error) {
      debug({
        error,
      });

      setPublishNimiError(error);
      openModal(ModalTypes.PUBLISH_NIMI);
      hideSpinner();
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

  return (
    <FormProvider {...useFormContext}>
      <InnerWrapper>
        <MainContent showMobile={!showPreviewMobile}>
          <PageSectionTitle>{t('creatingYourProfile')}</PageSectionTitle>
          <Card>
            <CardBody>
              <ProfileSettings />
              <FormWrapper onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
                <FormGroup>
                  <FormItem>
                    <Label htmlFor="description">{t('formLabel.description')}</Label>
                    <TextArea
                      onKeyDown={handleKeyDown}
                      placeholder="Description"
                      id="description"
                      {...register('description')}
                    />
                  </FormItem>
                </FormGroup>

                {linkFields && (
                  <ReorderGroup values={linkFields} onReorder={(fields) => replaceLink(fields)}>
                    {linkFields.map((field, index) => (
                      <ReorderInput
                        key={field.id}
                        index={index}
                        value={field}
                        removeLink={removeLink}
                        updateLink={updateLink}
                      />
                    ))}
                  </ReorderGroup>
                )}

                {blockchainAddressFields.length > 0 && (
                  <FormGroup>
                    <FormItem>
                      <Label>Addresses</Label>
                      <BlockchainAddresses>
                        {blockchainAddressFields.map((field, index) => {
                          return (
                            <NimiBlockchainField
                              key={field.blockchainAddressId}
                              index={index}
                              removeAddress={removeBlockchainAddress}
                              updateAddress={updateBlockchainAddress}
                              fieldValue={field}
                            />
                          );
                        })}
                      </BlockchainAddresses>
                    </FormItem>
                  </FormGroup>
                )}

                {getValues('widgets').some((el) => el.type === NimiWidgetType.POAP) && (
                  <PoapField
                    onConfigure={(e) => {
                      e.stopPropagation();
                      openModal(ModalTypes.CONFIGURE_POAPS);
                    }}
                    onRemove={() =>
                      setValue(
                        'widgets',
                        getValues('widgets').filter((el) => el.type !== NimiWidgetType.POAP)
                      )
                    }
                  />
                )}

                <AddFieldsButton />
                <PublishNimiButton />
                <PreviewMobileButton onClick={() => setShowPreviewMobile(true)} />
              </FormWrapper>
            </CardBody>
          </Card>
        </MainContent>
        <NimiPreview
          nimi={formWatchPayload}
          isContentShown={showPreviewMobile}
          hideContent={() => setShowPreviewMobile(false)}
        />
      </InnerWrapper>

      {modalOpened === ModalTypes.CONFIGURE_POAPS && (
        <ConfigurePOAPsModal ensAddress={ensAddress} closeModal={() => closeModal()} />
      )}

      {modalOpened === ModalTypes.TEMPLATE_PICKER && (
        <TemplatePickerModal
          themes={availableThemes.map((availableTheme) => themes[availableTheme])}
          closeModal={closeModal}
        />
      )}

      {modalOpened === ModalTypes.ADD_FIELDS && (
        <AddFieldsModal
          onClose={closeModal}
          onSubmit={({ link, blockchainAddresse, widget }) => {
            closeModal();

            //if link is submitted
            if (link) {
              addLinkToStart({
                id: generateID(),
                type: link,
                title: '',
                content: '',
              });
            }
            //if address is submitted
            if (blockchainAddresse) {
              addBlockchainAddressToStart({
                blockchain: blockchainAddresse,
                address: '',
              });
            }

            //if widget is submitted
            if (widget) {
              let newWidgets: NimiWidget[] = [];
              const currentWidgets = getValues('widgets');
              newWidgets = [...currentWidgets, { type: widget } as NimiWidget];

              setValue('widgets', newWidgets);
            }
          }}
        />
      )}

      {modalOpened === ModalTypes.IMPORT_FROM_TWITTER && (
        <ImportFromTwitterModal
          onClose={closeModal}
          onDataImport={(data) => {
            setValue('displayName', data.name);
            setValue('description', data.description);
            setValue('image', { type: NimiImageType.URL, url: data.profileImageUrl });

            addLinkToStart({ id: generateID(), type: NimiLinkType.TWITTER, title: '', content: data.username });

            closeModal();
          }}
        />
      )}

      {modalOpened === ModalTypes.PUBLISH_NIMI && (
        <PublishNimiModal
          ensName={ensName}
          ipfsHash={publishNimiResponseIpfsHash}
          isPublished={isNimiPublished}
          publishError={publishNimiError}
          setContentHashTransactionReceipt={setContentHashTransactionReceipt}
          onClose={closeModal}
        />
      )}

      {modalOpened === ModalTypes.IMPORT_FROM_LINKTREE && (
        <ImportFromLinktreeModal
          onClose={(linktreeNimi) => {
            closeModal();

            if (!linktreeNimi) return;

            if (linktreeNimi.links && linktreeNimi.links.length > 0) {
              //TODO: Add ids for each link
              addLinkToStart(linktreeNimi.links);
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
          ensAddress={ensAddress}
          onClose={(nftAsset) => {
            if (nftAsset) {
              setValue('image', {
                type: NimiImageType.ERC721,
                contract: nftAsset.asset_contract.address,
                tokenId: nftAsset.token_id as any,
                tokenUri: nftAsset.external_link,
                url: nftAsset.image_url,
              });
            }

            closeModal();
          }}
        />
      )}
    </FormProvider>
  );
}
