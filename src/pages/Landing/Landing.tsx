import { useWeb3React } from '@web3-react/core';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as NimiLogoText } from '../../assets/svg/nimi-logo-text.svg';
// SVGs
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { AppState } from '../../state';
import { useWalletSwitcherPopoverToggle } from '../../state/application/hooks';
// Styled components
import { Content, Header, HeroLead, HeroText, PageWrapper, HeaderEyebrow } from './styled';

export function Landing() {
  const { t } = useTranslation(['common', 'landing']);

  const { isActive, account } = useWeb3React();
  const phantomWallet = useSelector((state: AppState) => state.application.phantomWallet);
  const navigate = useNavigate();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();
  console.log('0hantom', phantomWallet);
  const onCTAClick = () => {
    if ((isActive && account) || phantomWallet) {
      navigate('/domains');
    } else {
      openWalletSwitcherPopover();
    }
  };

  return (
    <PageWrapper>
      <Header>
        <NimiLogoText height="60px" />
      </Header>
      <Content>
        <Container>
          <HeaderEyebrow>{t('hero.eyebrowText', { ns: 'landing' })}</HeaderEyebrow>
          <HeroText>
            <HeroLead>
              <Trans ns="lading" key="hero.lead">
                Your{' '}
                <i>
                  <strong>Web3</strong>
                </i>{' '}
                Identity.
              </Trans>
            </HeroLead>
          </HeroText>
          <Button onClick={onCTAClick}>
            <span>{t('hero.buttonLabel', { ns: 'landing' })}</span>
          </Button>
        </Container>
      </Content>
      <Footer />
    </PageWrapper>
  );
}
