import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo.svg';
// SVGs
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { useWalletSwitcherPopoverToggle } from '../../state/application/hooks';
// Styled components
import { Content, Header, HeroLead, HeroSub, HeroText, PageWrapper } from './styled';

export function Landing() {
  const { t } = useTranslation(['common', 'landing']);

  const { isActive, account } = useWeb3React();
  const navigate = useNavigate();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();

  const onCTAClick = () => {
    if (isActive && account) {
      navigate('/domains');
    } else {
      openWalletSwitcherPopover();
    }
  };

  return (
    <PageWrapper>
      <Header>
        <NimiLogo height="72px" />
      </Header>
      <Content>
        <Container>
          <HeroText>
            <HeroLead>{t('hero.lead', { ns: 'landing' })}</HeroLead>
            <HeroSub>{t('hero.sub', { ns: 'landing' })}</HeroSub>
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
