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
import { ReactComponent as PoapLogo } from '../../../../assets/svg/poap-logo.svg';

import { LinksSection } from './LinksSection';
import { ButtonGroup } from '../../../form/Button';
import { renderSVG } from '../../../../utils';
import { useFormContext } from 'react-hook-form';

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

const StyledPoapLogo = styled(PoapLogo)`
  width: 20px;
  height: 20px;
`;

interface AddFieldsOptions {
  link?: NimiLinkType;
  blockchainAddresse?: NimiBlockchain;
  widget?: NimiWidgetType;
}

export interface AddFieldsModalProps {
  onClose?: () => void;
  onChange?: (data: AddFieldsOptions) => void;
  onSubmit?: (data: AddFieldsOptions) => void;
}

const nimiWidgetTypes = Object.keys(NimiWidgetType);

const ProfileSectionLinks = [NimiLinkType.URL, NimiLinkType.EMAIL, NimiLinkType.TELEGRAM];
const ContactsSectionLinks = [
  NimiLinkType.WHATSAPP,
  NimiLinkType.DISCORD,
  NimiLinkType.MESSENGER,
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
  NimiLinkType.DRIBBBLE,
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
export function AddFieldsModal({ onChange, onClose, onSubmit }: AddFieldsModalProps) {
  const { t } = useTranslation('nimi');
  const { getValues } = useFormContext();

  const onLinksChange = (newLink: NimiLinkType) => {
    const newState: NimiLinkType = newLink as NimiLinkType;
    // emit the change event
    onChange?.({
      link: newState,
    });
    onSubmit?.({
      link: newState,
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
            {Object.values(NimiBlockchain)
              .filter((item) => item !== NimiBlockchain.SOLANA)
              .map((blockchain) => {
                const inputId = `modal-checkbox-${blockchain}`;
                const i18nKey = `formLabel.${blockchain.toLowerCase()}`;
                const logo = NIMI_BLOCKCHAIN_LOGO_URL[blockchain];
                const onChangeHandler = () => {
                  // Compute the new state and then batch it previous state for onChange have newest state
                  const newState = blockchain as NimiBlockchain;

                  // emit the change event
                  onChange?.({
                    blockchainAddresse: newState,
                  });
                  onSubmit?.({
                    blockchainAddresse: newState,
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
              const checked = getValues('widgets').some(({ type }) => type === widget);

              const inputOnChange = () => {
                // Compute the new state and then batch it previous state for onChange have newest state
                const newState = widget as NimiWidgetType;

                // emit the change event
                onChange?.({
                  widget: newState,
                });
                onSubmit?.({
                  widget: newState,
                });
              };

              return (
                <ButtonGroup active={checked} key={inputId} id={inputId} onClick={inputOnChange}>
                  <StyledPoapLogo />
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
