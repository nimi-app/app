import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';

// SVGs
import { ReactComponent as CTAButtonLogo } from '../../assets/svg/wallet-connect.svg';
import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo.svg';

// Styled components
import { PageWrapper, Header, Content, HeroLead, HeroSub, HeroText } from './styled';
import { useWalletSwitcherPopoverToggle } from '../../state/application/hooks';

import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { Footer } from '../../components/Footer';

export function Landing() {
  const { t } = useTranslation(['common', 'landing']);

  const { isActive, account, isActivating } = useWeb3React();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();

  return (
    <PageWrapper>
      <Header>
        <NimiLogo />
      </Header>
      <Content>
        <Container>
          <HeroText>
            <HeroLead>{t('hero.lead', { ns: 'landing' })}</HeroLead>
            <HeroSub>{t('hero.sub', { ns: 'landing' })}</HeroSub>
          </HeroText>
          {isActive && account ? (
            <Button to="/domains">
              <CTAButtonLogo />
              <span>{t('goToDomains')}</span>
            </Button>
          ) : (
            <Button onClick={openWalletSwitcherPopover}>
              <CTAButtonLogo />
              {isActivating ? <span>{t('connecting')}</span> : <span>{t('connectWallet')}</span>}
            </Button>
          )}
        </Container>
      </Content>
      <Footer />
    </PageWrapper>
  );
}
