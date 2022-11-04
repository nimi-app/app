import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/dist/client/router';
import { Trans, useTranslation } from 'react-i18next';

import NimiLogoText from '../assets/svg/nimi-logo-text.svg';
// SVGs
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { useWalletSwitcherPopoverToggle } from '../state/application/hooks';
// Styled components
import { Content, Header, HeaderEyebrow, HeroLead, HeroText, PageWrapper } from './index.styled';

export default function IndexPage() {
  const { t } = useTranslation(['common', 'landing']);

  console.log('t', t);

  const { isActive, account } = useWeb3React();
  const router = useRouter();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();

  const onCTAClick = () => {
    if (isActive && account) {
      router.push('/domains');
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
