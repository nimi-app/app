import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { NimiBlockchain, NimiWidgetType, NimiLinkType, NIMI_BLOCKCHAIN_LOGO_URL } from 'nimi-card';

import {
  Modal,
  Header as ModalHeaderBase,
  Content as ModalContentBase,
  CloseButton as ModalCloseButton,
  Title as ModalTitle,
  ModalSubTitle,
} from '../../../Modal';
import { StyledFlexList, StyledGridList } from '../../styled';
import { ChangeEventHandler, useState } from 'react';
import { ReactComponent as PoapLogo } from '../../../../assets/svg/poap-logo.svg';

import { LinksSection } from './LinksSection';
import { ButtonGroup } from '../../../form/Button';
import { renderSVG } from '../../../../utils';

const ModalHeader = styled(ModalHeaderBase)`
  padding: 82px 82px 0 82px;
  justify-content: center;
`;

const ModalContent = styled(ModalContentBase)`
  padding: 50px 82px;
`;

const SectionWrapper = styled.div`
  margin-bottom: 30px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  color: #4e5d78;
  margin-bottom: 28px;
`;

interface AddFieldsOptions {
  links: NimiLinkType[];
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

const ProfileSectionLinks = [NimiLinkType.URL, NimiLinkType.EMAIL, NimiLinkType.TELEGRAM];
const ContactsSectionLinks = [
  NimiLinkType.WHATSAPP,
  NimiLinkType.DISCORD,
  NimiLinkType.MESSANGER,
  NimiLinkType.WECHAT,
  NimiLinkType.KEYBASE,
];
const SocialsSectionLinks = [
  NimiLinkType.TWITTER,
  NimiLinkType.LENSTER,
  NimiLinkType.INSTAGRAM,
  NimiLinkType.DISCORD,
  NimiLinkType.SNAPCHAT,
  NimiLinkType.MEDIUM,
  NimiLinkType.LINKEDIN,
  NimiLinkType.FACEBOOK,
  NimiLinkType.TWITCH,
];

const PortfolioSectionLinks = [
  NimiLinkType.DRIBBLE,
  NimiLinkType.FIGMA,
  NimiLinkType.FACEBOOK,
  NimiLinkType.GITHUB,
  NimiLinkType.DISCORD,
];

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
  const [linkList, setLinkList] = useState<NimiLinkType[]>(initialValues.links);
  const [addressList, setAddressList] = useState<NimiBlockchain[]>(initialValues.blockchainAddresses);
  const [widgetList, setWidgetList] = useState<NimiWidgetType[]>(initialValues.widgets);
  const onLinksChange = (newLink: NimiLinkType) => {
    const newState: NimiLinkType[] = [...linkList, newLink as NimiLinkType];
    setLinkList(newState);
    // emit the change event
    onChange?.({
      links: newState,
      blockchainAddresses: addressList,
      widgets: widgetList,
    });
    onSubmit?.({
      links: newState,
      blockchainAddresses: addressList,
      widgets: widgetList,
    });
  };
  return (
    <Modal maxWidth={'620px'}>
      <ModalHeader>
        <ModalCloseButton role="button" onClick={() => onClose?.()} />
        <ModalTitle>{t('addFieldsModal.title')}</ModalTitle>
        <ModalSubTitle>{t('addFieldsModal.description')}</ModalSubTitle>
      </ModalHeader>
      <ModalContent>
        <LinksSection title={'profile'} sectionLinks={ProfileSectionLinks} onChange={onLinksChange} />
        <LinksSection title={'contacts'} sectionLinks={ContactsSectionLinks} onChange={onLinksChange} />
        <LinksSection title={'socials'} sectionLinks={SocialsSectionLinks} onChange={onLinksChange} />
        <LinksSection title={'portfolio'} sectionLinks={PortfolioSectionLinks} onChange={onLinksChange} />
        <SectionWrapper>
          <SectionTitle>{t('addFieldsModal.addreses')}</SectionTitle>
          <StyledFlexList>
            {Object.values(NimiBlockchain).map((blockchain) => {
              const inputId = `modal-checkbox-${blockchain}`;
              const i18nKey = `formLabel.${blockchain.toLowerCase()}`;
              const logo = NIMI_BLOCKCHAIN_LOGO_URL[blockchain];
              const onChangeHandler = () => {
                // Compute the new state and then batch it previous state for onChange have newest state
                const newState = [...addressList, blockchain as NimiBlockchain];
                console.log('addressList', addressList);
                setAddressList(newState);
                // emit the change event
                onChange?.({
                  links: linkList,
                  blockchainAddresses: newState,
                  widgets: widgetList,
                });
                onSubmit?.({
                  links: linkList,
                  blockchainAddresses: newState,
                  widgets: widgetList,
                });
              };

              return (
                <ButtonGroup key={inputId} id={inputId} onClick={onChangeHandler}>
                  {renderSVG(logo)}
                  {t(i18nKey)}
                </ButtonGroup>
              );
            })}
          </StyledFlexList>
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

                // emit the change event
                onChange?.({
                  links: linkList,
                  blockchainAddresses: addressList,
                  widgets: newState,
                });
                onSubmit?.({
                  links: linkList,
                  blockchainAddresses: addressList,
                  widgets: newState,
                });
              };

              return (
                <ButtonGroup active={checked} key={inputId} id={inputId} onClick={inputOnChange}>
                  {PoapLogo}
                  {t(i18nKey)}
                </ButtonGroup>
              );
            })}
          </StyledGridList>
        </SectionWrapper>
      </ModalContent>
    </Modal>
  );
}
