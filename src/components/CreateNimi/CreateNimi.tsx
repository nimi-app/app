import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { linkTypeList, Nimi, nimiCard, NimiLinkType, Blockchain, blockchainList } from 'nimi-card';
import { Modal, Header as ModalHeader, Content as ModalContent, Footer as ModalFooter } from '../Modal';
import { CardBody } from '../Card';
import { Card, InnerWrapper, MainContent, PreviewContent, CardTitle, StyledGridList } from './styled';
import { Button } from '../Button';
import { Label, Input, TextArea, FormGroup } from '../form';
import { NimiBlockchainField } from './partials/NimiBlockchainField';
import { NimiLinkField } from './partials/NimiLinkField';
import { ComingSoonCards } from './partials/ComingSoonCards';

export interface CreateNimiProps {
  ensAddress: string;
  ensName: string;
  ensLabelName: string;
}

export function CreateNimi({ ensAddress, ensName }: CreateNimiProps) {
  /**
   * @todo replace this API
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation('nimi');
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

  const nimiPayload = watch();

  // Manages the links blockchain address list
  const [formLinkList, setFormLinkList] = useState<NimiLinkType[]>([]);
  const [formAddressList, setFormAddressList] = useState<Blockchain[]>([]);

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
                {formLinkList.map((link) => {
                  const label = t(`formLabel.${link}`);

                  return (
                    <FormGroup key={'blockchain-input-' + link}>
                      <NimiLinkField key={'link-input' + link} label={label} link={link} />
                    </FormGroup>
                  );
                })}
                {formAddressList.map((blockchain) => {
                  const label = t(`formLabel.${blockchain}`);

                  return (
                    <FormGroup key={'blockchain-input-' + blockchain}>
                      <NimiBlockchainField label={label} blockchain={blockchain} />
                    </FormGroup>
                  );
                })}
                <FormGroup>
                  <Button type="button" onClick={() => setIsModalOpen(true)}>
                    {t('buttonLabel.addNimis')}
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
          <Card variant="blurred">
            <CardBody>
              <CardTitle>{t('preview')}</CardTitle>
              {nimiPayload && (
                <pre>
                  <code>{JSON.stringify(nimiPayload, null, 2)}</code>
                </pre>
              )}
            </CardBody>
          </Card>
        </PreviewContent>
      </InnerWrapper>
      {isModalOpen && (
        <Modal>
          <ModalHeader>
            <h2>{t('modalTitle.addNimis')}</h2>
          </ModalHeader>
          <ModalContent>
            <StyledGridList>
              {linkTypeList.map((link) => {
                const inputId = `modal-checkbox-${link}`;
                const i18nKey = `formLabel.${link}`;
                const checked = formLinkList.includes(link);

                const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
                  if (event.target.checked) {
                    setFormLinkList([...formLinkList, link]);
                  } else {
                    setFormLinkList(formLinkList.filter((item) => item !== link));
                  }
                };

                return (
                  <div key={inputId}>
                    <Label htmlFor={inputId}>
                      <Input id={inputId} type="checkbox" checked={checked} name={link} onChange={onChange} />
                      {t(i18nKey)}
                    </Label>
                  </div>
                );
              })}
              {blockchainList.map((blockchain) => {
                const inputId = `modal-checkbox-${blockchain}`;
                const i18nKey = `formLabel.${blockchain}`;
                const checked = formAddressList.includes(blockchain);

                const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
                  if (event.target.checked) {
                    setFormAddressList([...formAddressList, blockchain]);
                  } else {
                    setFormAddressList(formAddressList.filter((item) => item !== blockchain));
                  }
                };

                return (
                  <div key={inputId}>
                    <Label htmlFor={inputId}>
                      <Input id={inputId} type="checkbox" checked={checked} name={blockchain} onChange={onChange} />
                      {t(i18nKey)}
                    </Label>
                  </div>
                );
              })}
            </StyledGridList>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => setIsModalOpen(false)}>{t('close')}</Button>
          </ModalFooter>
        </Modal>
      )}
    </FormProvider>
  );
}
