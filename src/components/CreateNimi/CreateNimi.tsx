import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import {
  linkTypeList,
  Nimi,
  nimiCard,
  NimiLinkType,
  Blockchain,
  NimiLink,
  NimiBlockchainAddress,
  blockchainList,
} from 'nimi-card';
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
  ensAddress: string;
  ensName: string;
  ensLabelName: string;
}

const StyledGridList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

interface NimiLinkInputProps {
  link: NimiLinkType;
  label: string;
}

interface NimiBlockchainInputProps {
  blockchain: Blockchain;
}

/**
 * Handles the input for the link type
 */
function NimiLinkInput({ link, label }: NimiLinkInputProps) {
  const { setValue, getValues } = useFormContext<Nimi>();

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const prevState = getValues('links') || [];
    const hasLink = prevState.some((prevLink) => prevLink.type === link);
    const newState: NimiLink[] = hasLink
      ? prevState.map((curr) => {
          if (curr.type === link) {
            return { ...curr, url: event.target.value };
          }

          return curr;
        })
      : [...prevState, { type: link, label, url: event.target.value }];

    setValue('links', newState);
  };

  return (
    <FormGroup key={link}>
      <Label htmlFor={link}>{label}</Label>
      <Input type="text" id={link} onChange={onChange} />
    </FormGroup>
  );
}

/**
 * Handles the input for blockchain address
 */
function NimiBlockchainInput({ blockchain }: NimiBlockchainInputProps) {
  const { t } = useTranslation('nimi');

  const { setValue, getValues } = useFormContext<Nimi>();
  const i18nKey = `formLabel.${blockchain}`;

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const prevState = getValues('addresses') || [];
    const hasLink = prevState.some((prevLink) => prevLink.blockchain === blockchain);
    const newState: NimiBlockchainAddress[] = hasLink
      ? prevState.map((curr) => {
          if (curr.blockchain === blockchain) {
            return { ...curr, url: event.target.value };
          }

          return curr;
        })
      : [...prevState, { blockchain, address: event.target.value }];

    setValue('addresses', newState);
  };

  return (
    <FormGroup key={blockchain}>
      <Label htmlFor={blockchain}>{t(i18nKey)}</Label>
      <Input type="text" id={blockchain} onChange={onChange} />
    </FormGroup>
  );
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
              <TitleText>
                {t('creatingSiteNamesPersonalSite', {
                  siteName: ensName,
                })}
              </TitleText>
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
                  const i18nKey = `formLabel.${link}`;
                  return <NimiLinkInput key={'link-input' + link} label={t(i18nKey)} link={link} />;
                })}
                {formAddressList.map((blockchain) => (
                  <NimiBlockchainInput key={'blockchain-input-' + blockchain} blockchain={blockchain} />
                ))}
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
