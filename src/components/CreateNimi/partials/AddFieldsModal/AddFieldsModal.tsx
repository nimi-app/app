import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { blockchainList, linkTypeList, NimiLink, NimiBlockchain, NimiWidgetType } from 'nimi-card';

import {
  Modal,
  Header as ModalHeaderBase,
  Content as ModalContentBase,
  Footer as ModalFooterBase,
  CloseButton as ModalCloseButton,
  Title as ModalTitle,
} from '../../../Modal';
import { StyledGridList } from '../../styled';
import { ChangeEventHandler, useState } from 'react';
import { Button } from '../../../Button';
import { Checkbox } from '../../../form';

const ModalHeader = styled(ModalHeaderBase)`
  padding: 82px 82px 0 82px;
  justify-content: center;
`;

const ModalContent = styled(ModalContentBase)`
  padding: 50px 82px;
`;

const ModalFooter = styled(ModalFooterBase)`
  padding: 0 82px 82px 82px;
  justify-content: center;
`;

const SectionWrapper = styled.div`
  margin-bottom: 30px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  color: #4e5d78;
  margin-bottom: 32px;
`;

interface AddFieldsOptions {
  links: NimiLink[];
  blockchainAddresses: NimiBlockchain[];
  widgets: NimiWidgetType[];
}

export interface AddFieldsModalProps {
  onClose?: () => void;
  onChange?: (data: AddFieldsOptions) => void;
  onSubmit?: (data: AddFieldsOptions) => void;
  initialValues?: AddFieldsOptions;
}

const nimiWidgetTypes = Object.keys(NimiWidgetType);

/**
 * A modal to select the fields to add to the Nimi form.
 * @todo refacotr the variables to be more descriptive, and reduce repeated code
 * @param param0
 * @returns
 */
export function AddFieldsModal({ onChange, onClose, onSubmit, initialValues }: AddFieldsModalProps) {
  const { t } = useTranslation('nimi');

  // Take the intial state values from props if they exist
  initialValues = initialValues || {
    links: [],
    blockchainAddresses: [],
    widgets: [],
  };

  // An internal state to keep track of the current selected link type
  // Manages the links blockchain address list
  const [linkList, setLinkList] = useState<NimiLink[]>(initialValues.links);
  const [addressList, setAddressList] = useState<NimiBlockchain[]>(initialValues.blockchainAddresses);
  const [widgetList, setWidgetList] = useState<NimiWidgetType[]>(initialValues.widgets);

  return (
    <Modal>
      <ModalHeader>
        <ModalCloseButton role="button" onClick={() => onClose?.()} />
        <ModalTitle>{t('addFieldsModal.title')}</ModalTitle>
        <small>{t('addFieldsModal.description')}</small>
      </ModalHeader>
      <ModalContent>
        <SectionWrapper>
          <SectionTitle>{t('addFieldsModal.socials')}</SectionTitle>
          <StyledGridList>
            {linkTypeList.map((link) => {
              const inputId = `modal-checkbox-${link}`;
              const i18nKey = `formLabel.${link}`;
              const checked = linkList.includes(link);

              const inputOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
                // Compute the new state and then batch it previous state for onChange have newest state
                const newState = event.target.checked ? [...linkList, link] : linkList.filter((item) => item !== link);

                setLinkList(newState);
                // emit the change event
                onChange?.({
                  links: newState,
                  blockchainAddresses: addressList,
                  widgets: widgetList,
                });
              };

              return (
                <Checkbox key={inputId} defaultChecked={checked} id={inputId} name={link} onChange={inputOnChange}>
                  {t(i18nKey)}
                </Checkbox>
              );
            })}
          </StyledGridList>
        </SectionWrapper>
        <SectionWrapper>
          <SectionTitle>{t('addFieldsModal.addreses')}</SectionTitle>
          <StyledGridList>
            {blockchainList.map((blockchain) => {
              const inputId = `modal-checkbox-${blockchain}`;
              const i18nKey = `formLabel.${blockchain}`;
              const checked = addressList.includes(blockchain);

              const inputOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
                // Compute the new state and then batch it previous state for onChange have newest state
                const newState = event.target.checked
                  ? [...addressList, blockchain]
                  : addressList.filter((item) => item !== blockchain);

                setAddressList(newState);
                // emit the change event
                onChange?.({
                  links: linkList,
                  blockchainAddresses: newState,
                  widgets: widgetList,
                });
              };

              return (
                <Checkbox key={inputId} checked={checked} id={inputId} name={blockchain} onChange={inputOnChange}>
                  {t(i18nKey)}
                </Checkbox>
              );
            })}
          </StyledGridList>
        </SectionWrapper>
        <SectionWrapper>
          <SectionTitle>{t('addFieldsModal.nfts')}</SectionTitle>
          <StyledGridList>
            {nimiWidgetTypes.map((widget) => {
              const inputId = `modal-checkbox-${widget}`;
              const i18nKey = `formWidgetLabel.${widget}`;
              const checked = widgetList.includes(widget as NimiWidgetType);

              const inputOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
                // Compute the new state and then batch it previous state for onChange have newest state
                const newState = event.target.checked
                  ? [...widgetList, widget as NimiWidgetType]
                  : widgetList.filter((item) => item !== widget);

                setWidgetList(newState);
                console.log('newWidge', newState);
                // emit the change event
                onChange?.({
                  links: linkList,
                  blockchainAddresses: addressList,
                  widgets: newState,
                });
              };

              return (
                <Checkbox
                  key={inputId}
                  checked={checked}
                  id={inputId}
                  name={`widget-${widget.toLowerCase()}`}
                  onChange={inputOnChange}
                >
                  {t(i18nKey)}
                </Checkbox>
              );
            })}
          </StyledGridList>
        </SectionWrapper>
      </ModalContent>
      <ModalFooter>
        <Button
          onClick={() => {
            onSubmit?.({
              links: linkList,
              blockchainAddresses: addressList,
              widgets: widgetList,
            });
          }}
        >
          {t('buttonLabel.addFields')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
