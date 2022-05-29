import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';

import { Nimi, nimiCard, NimiLinkType, Blockchain, blockchainList, linkTypeList } from 'nimi-card';
import { CardBody } from '../Card';
import { Card, InnerWrapper, MainContent, PreviewContent, CardTitle } from './styled';
import { Button } from '../Button';
import { Label, Input, TextArea, FormGroup } from '../form';

// Partials
import { NimiBlockchainField } from './partials/NimiBlockchainField';
import { NimiLinkField } from './partials/NimiLinkField';
import { ComingSoonCards } from './partials/ComingSoonCards';
import { AddFieldsModal } from './partials/AddFieldsModal';
import { NimiPreviewCard } from './partials/NimiPreviewCard';

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

  const { register, watch, handleSubmit } = useFormContext;

  // Manages the links blockchain address list
  const [formLinkList, setFormLinkList] = useState<NimiLinkType[]>([]);
  const [formAddressList, setFormAddressList] = useState<Blockchain[]>([]);
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
          <Card variant="blurred">
            <CardBody>
              <CardTitle>
                {t('creatingSiteNamesPersonalSite', {
                  siteName: ensName,
                })}
              </CardTitle>
              <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
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
                    <FormGroup key={'blockchain-input-' + link}>
                      <NimiLinkField key={'link-input' + link} label={label} link={link} />
                    </FormGroup>
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
                  <Button type="button" onClick={() => setIsAddFieldsModalOpen(true)}>
                    {t('buttonLabel.addFields')}
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Button type="submit">{t('saveAndDeployNimiSite')}</Button>
                </FormGroup>
              </form>
            </CardBody>
          </Card>
          <ComingSoonCards />
        </MainContent>
        <PreviewContent>
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
    </FormProvider>
  );
}
