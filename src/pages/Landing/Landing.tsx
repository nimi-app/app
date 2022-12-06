import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as NimiLogoText } from '../../assets/svg/nimi-logo-text.svg';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Content, Header, HeroLead, HeroText, PageWrapper, HeaderEyebrow } from './styled';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

export function Landing() {
  const { t } = useTranslation(['common', 'landing']);
  const navigate = useNavigate();

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
          <ConnectButton.Custom>
            {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button onClick={openConnectModal}>
                          <span>{t('hero.buttonLabel', { ns: 'landing' })}</span>
                        </Button>
                      );
                    }
                    navigate('/domains');
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </Container>
      </Content>
      <Footer />
    </PageWrapper>
  );
}
