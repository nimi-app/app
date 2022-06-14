import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';

import { Nimi, nimiCard, NimiLink, NimiBlockchain, blockchainList, linkTypeList } from 'nimi-card';
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

export interface CreateNimiProps {
  ensAddress: string;
  ensName: string;
  ensLabelName: string;
}

export function CreateNimi({ ensAddress, ensName }: CreateNimiProps) {
  /**
   * @todo replace this API
   */
  const [isAddFieldsModalOpen, setIsAddFieldsModalOpen] = useState(false);
  const [isImportFromTwitterModalOpen, setIsImportFromTwitterModalOpen] = useState(false);

  const { t } = useTranslation('nimi');

  // Form state manager
  const useFormContext = useForm<Nimi>({
    resolver: yupResolver(nimiCard),
    defaultValues: {
      displayName: ensName,
      ensAddress: ensAddress,
      ensName,
      addresses: [],
      links: [],
    },
  });

  const { register, watch, handleSubmit, setValue } = useFormContext;

  // Manages the links blockchain address list
  const [formLinkList, setFormLinkList] = useState<NimiLink[]>([]);
  const [formAddressList, setFormAddressList] = useState<NimiBlockchain[]>([]);
  // To keep the same order of links and addresses, compute
  // the list of blockchain addresses and links from Nimi
  const selectedBlockchainAddressFieldList = useMemo(
    () => blockchainList.filter((blockchain) => formAddressList.includes(blockchain)),
    [formAddressList]
  );
  const selectedLinkFieldList = useMemo(
    () => linkTypeList.filter((link) => formLinkList.includes(link)),
    [formLinkList]
  );

  const formWatchPayload = watch();

  /**
   * Handle the form submit via ENS contract interaction
   * @param data
   */
  const onSubmitValid = (data) => {
    console.log(data);
  };

  const onSubmitInvalid = (data) => {
    console.error(data);
  };

  return (
    <FormProvider {...useFormContext}>
      <InnerWrapper>
        <MainContent>
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
                <ImportFromLensProtocolButton>{t('buttonLabel.importFromLensProtocol')}</ImportFromLensProtocolButton>
              </ImportButtonsWrapper>
              <FormWrapper onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
                <FormGroup>
                  <Label htmlFor="displayName">{t('formLabel.displayName')}</Label>
                  <Input id="displayName" {...register('displayName')} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="description">{t('formLabel.description')}</Label>
                  <TextArea id="description" {...register('description')}></TextArea>
                </FormGroup>

                {selectedLinkFieldList.map((link) => {
                  const label = t(`formLabel.${link}`);

                  return (
                    <LinkFormGroup key={'blockchain-input-' + link}>
                      <NimiLinkField key={'link-input' + link} label={label} link={link} />
                    </LinkFormGroup>
                  );
                })}
                {selectedBlockchainAddressFieldList.map((blockchain) => {
                  const label = t(`formLabel.${blockchain}`);

                  return (
                    <FormGroup key={'blockchain-input-' + blockchain}>
                      <NimiBlockchainField label={label} blockchain={blockchain} />
                    </FormGroup>
                  );
                })}

                <FormGroup>
                  <AddFieldsButton type="button" onClick={() => setIsAddFieldsModalOpen(true)}>
                    + {t('buttonLabel.addFields')}
                  </AddFieldsButton>
                </FormGroup>
                <FormGroup>
                  <SaveAndDeployButton type="submit">{t('saveAndDeployNimiSite')}</SaveAndDeployButton>
                </FormGroup>
              </FormWrapper>
            </CardBody>
          </Card>
        </MainContent>
        <PreviewContent>
          <PageSectionTitle>{t('preview')}</PageSectionTitle>
          <NimiPreviewCard nimi={formWatchPayload} />
        </PreviewContent>
      </InnerWrapper>
      {isAddFieldsModalOpen && (
        <AddFieldsModal
          initialValues={{
            links: formLinkList,
            blockchainAddresses: formAddressList,
          }}
          onClose={() => setIsAddFieldsModalOpen(false)}
          onSubmit={({ links, blockchainAddresses }) => {
            setIsAddFieldsModalOpen(false);
            setFormLinkList(links);
            setFormAddressList(blockchainAddresses);
          }}
        />
      )}
      {isImportFromTwitterModalOpen && (
        <ImportFromTwitterModal
          onClose={() => setIsImportFromTwitterModalOpen(false)}
          onDataImport={(data) => {
            // Set the fields and close the modal
            setValue('displayName', data.name);
            setValue('description', data.description);
            setValue('displayImageUrl', data.profileImageUrl);

            setIsImportFromTwitterModalOpen(false);
          }}
        />
      )}
    </FormProvider>
  );
}
