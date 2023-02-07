import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Content, Header, HeaderEyebrow, HeroLead, HeroText, PageWrapper } from './styled';
import { ReactComponent as NimiLogoText } from '../../assets/svg/nimi-logo-text.svg';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import '@rainbow-me/rainbowkit/styles.css';

export function Landing() {
  const { t } = useTranslation(['common', 'landing']);
  const navigate = useNavigate();
  console.log('here');
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
            {({ account, chain, openConnectModal, openChainModal, authenticationStatus, mounted }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected = ready && account && chain;
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
                    if (!connected || chain.unsupported) {
                      return (
                        <Button
                          onClick={() => {
                            if (!connected) openConnectModal();
                            else openChainModal();
                          }}
                        >
                          <span>
                            {chain?.unsupported ? t('error.wrongNetwork') : t('hero.buttonLabel', { ns: 'landing' })}
                          </span>
                        </Button>
                      );
                    }
                    navigate('/domains/all');
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
