import { NIMI_BLOCKCHAIN_LOGO_URL, NIMI_LINK_DETAIL_EXTENDED } from '@nimi.io/card/constants';
import { Nimi, NimiBlockchain, NimiLinkType, NimiWidgetType } from '@nimi.io/card/types';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { LinksSection } from './LinksSection';
import { StyledFlexList, StyledGridList } from './styled';
import NftyChatLogo from '../../assets/svg/nftychat-logo.svg';
import PoapLogo from '../../assets/svg/poap-logo.svg';
import { ButtonGroup } from '../../components/form/Button';
import { Modal, Content as ModalContentBase } from '../../components/Modal';
import { renderSVG } from '../../utils';

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

const StyledNftyLogo = styled(NftyChatLogo)`
  width: 20px;
  height: 20px;
`;

interface AddFieldsOptions {
  link?: NimiLinkType;
  blockchainAddresse?: NimiBlockchain;
  widget?: NimiWidgetType;
}

export interface AddFieldsModalProps {
  onClose: () => void;
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
  NimiLinkType.SNAPCHAT,
  NimiLinkType.MEDIUM,
  NimiLinkType.LINKEDIN,
  NimiLinkType.FACEBOOK,
  NimiLinkType.TWITCH,
  NimiLinkType.YOUTUBE_CHANNEL,
];

const PortfolioSectionLinks = [NimiLinkType.DRIBBBLE, NimiLinkType.FIGMA, NimiLinkType.GITHUB];

/**
 * A modal to select the fields to add to the Nimi form.
 * @todo refacotr the variables to be more descriptive, and reduce repeated code
 * @param param0
 * @returns
 */
export function AddFieldsModal({ onChange, onClose, onSubmit }: AddFieldsModalProps) {
  const { t } = useTranslation('nimi');
  const { getValues } = useFormContext<Nimi>();

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
    <Modal
      title={t('addFieldsModal.title')!}
      subtitle={t('addFieldsModal.description')!}
      handleCloseModal={onClose}
      maxWidth={'620px'}
    >
      <ModalContentBase>
        <LinksSection title={'profile'} sectionLinks={ProfileSectionLinks} onChange={onLinksChange} />
        <SectionWrapper>
          <SectionTitle>{t('addFieldsModal.contacts')}</SectionTitle>
          <StyledFlexList>
            {ContactsSectionLinks.map((link) => {
              const inputId = `modal-checkbox-${link}`;
              const i18nKey = `formLabel.${link.toLowerCase()}`;
              const logo = NIMI_LINK_DETAIL_EXTENDED[link].logo;

              return (
                <ButtonGroup key={inputId} id={inputId} onClick={() => onLinksChange(link)}>
                  {renderSVG(logo)}
                  {t(i18nKey)}
                </ButtonGroup>
              );
            })}
            {nimiWidgetTypes.map((widget) => {
              // Hide POAP
              if (widget === NimiWidgetType.POAP) {
                return null;
              }
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
                <ButtonGroup disabled={checked} key={inputId} id={inputId} onClick={inputOnChange}>
                  {widget === NimiWidgetType.NFTY_UNIVERSAL_DM && <StyledNftyLogo />}
                  {t(i18nKey)}
                </ButtonGroup>
              );
            })}
          </StyledFlexList>
        </SectionWrapper>
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
              // Hide nfty
              if (widget === NimiWidgetType.NFTY_UNIVERSAL_DM) {
                return null;
              }

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
                <ButtonGroup disabled={checked} key={inputId} id={inputId} onClick={inputOnChange}>
                  <>
                    {widget === NimiWidgetType.POAP && <StyledPoapLogo />}
                    {widget === NimiWidgetType.NFTY_UNIVERSAL_DM && <StyledNftyLogo />}
                    {t(i18nKey)}
                  </>
                </ButtonGroup>
              );
            })}
          </StyledGridList>
        </SectionWrapper>
      </ModalContentBase>
    </Modal>
  );
}
