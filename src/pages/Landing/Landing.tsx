import { useWeb3React } from '@web3-react/core';
import { Trans, useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

import { ReactComponent as NimiLogoText } from '../../assets/svg/nimi-logo-text.svg';
// SVGs
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { ActiveNetworkState, useActiveNetwork } from '../../context/ActiveNetwork';
import { useSolana } from '../../context/SolanaProvider';

import { useWalletSwitcherPopoverToggle } from '../../state/application/hooks';
// Styled components
import { Content, Header, HeroLead, HeroText, PageWrapper, HeaderEyebrow } from './styled';

export function Landing() {
  const { t } = useTranslation(['common', 'landing']);

  const { isActive, account } = useWeb3React();
  const { publicKey } = useSolana();
  const { activeNetwork } = useActiveNetwork();
  const navigate = useNavigate();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();
  const onCTAClick = () => {
    if (
      (isActive && account && activeNetwork === ActiveNetworkState.ETHEREUM) ||
      (activeNetwork === ActiveNetworkState.SOLANA && publicKey)
    ) {
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
