import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { linkTypeList, Nimi, NimiBlockchainAddress, nimiCard, NimiLinkType } from '../../library';
import { Modal, Header as ModalHeader, Content as ModalContent, Footer as ModalFooter } from '../Modal';
import { CommingSoonCards } from './sections';
import { CardBody } from '../Card';
import { Card, InnerWrapper, MainContent, PreviewContent } from './styled';
import { TitleText } from '../Template/Input/styleds';
import { FormGroup } from '../form/FormGroup';
import { Button } from '../Button';
import { TextArea } from '../form/TextArea/TextArea';
import { Input } from '../form/Input';
import { Label } from '../form';

interface CreateNimiProps {
  name: string;
  labelName: string;
}

const StyledGridList = styled.div`
  @media (min-width: 1px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
`;

export function CreateNimi({ labelName, name }: CreateNimiProps) {
  /**
   * @todo replace this API
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation('nimi');
  const useFormContext = useForm<Nimi>({
    resolver: yupResolver(nimiCard),
    defaultValues: {},
  });

  const { register, watch, handleSubmit } = useFormContext;

  const nimiPayload = watch();

  const [formLinkList, setFormLinkList] = useState<NimiLinkType[]>([]);
  const [formAddressList, setFormAddressList] = useState<NimiBlockchainAddress[]>([]);

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
              <TitleText>
                {t('creatingSiteNamesPersonalSite', {
                  siteName: labelName,
                })}
              </TitleText>
              <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
                <FormGroup>
                  <Label htmlFor="displayName">{t('displayName')}</Label>
                  <Input id="displayName" {...register('displayName')} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="description">{t('description')}</Label>
                  <TextArea id="description" {...register('description')}></TextArea>
                </FormGroup>
                <FormGroup>
                  <Button onClick={() => setIsModalOpen(true)} type="submit">
                    {t('addFields.title')}
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Button type="submit">{t('saveAndDeployNimiSite')}</Button>
                </FormGroup>
              </form>
            </CardBody>
          </Card>
          <CommingSoonCards />
        </MainContent>
        <PreviewContent>
          <Card variant="blurred">
            <CardBody>
              <TitleText>{t('preview')}</TitleText>
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
            <h2>{t('addLinksModal.title')}</h2>
          </ModalHeader>
          <ModalContent>
            <StyledGridList>
              {linkTypeList.map((link) => {
                const inputId = `modal-checkbox-${link}`;
                const i18nKey = `links.${link}`;

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
                      <Input id={inputId} type="checkbox" name={link} onChange={onChange} />
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
