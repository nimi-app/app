import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import '@rainbow-me/rainbowkit/styles.css';

import backgroundImage from '../assets/images/nimi-header-background.jpeg';
import NimiLogoText from '../assets/svg/nimi-logo-text.svg';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { NimiSignatureColor } from '../theme';

export function ConnectWalletButton() {
  const { t } = useTranslation();
  const navigate = useRouter();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoaded(true);
    }
  }, []);

  if (!loaded) return null;

  return (
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
              navigate.push('/domains');
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default function IndexPage() {
  const { t } = useTranslation('landing');

  return (
    <>
      <Head>
        <title>Nimi</title>
      </Head>
      <PageWrapper>
        <Header>
          <NimiLogoText height="60px" />
        </Header>
        <Content>
          <Container>
            <HeaderEyebrow>{t('hero.eyebrowText', { ns: 'landing' })}</HeaderEyebrow>
            <HeroText>
              <HeroLead>
                <Trans ns="landing" key="hero.lead">
                  Your{' '}
                  <i>
                    <strong>Web3</strong>
                  </i>{' '}
                  Identity.
                </Trans>
              </HeroLead>
            </HeroText>
            <ConnectWalletButton />
          </Container>
        </Content>
        <Footer />
      </PageWrapper>
    </>
  );
}

export const PageWrapper = styled.div`
  display: flex;
  background-image: url('${backgroundImage.src}');
  background-position: center;
  background-size: cover;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;

  margin-top: 60px;
  flex-grow: 0;
  -webkit-box-pack: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-style: normal;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
`;

export const HeroText = styled.div`
  ${NimiSignatureColor};
  font-size: 72px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size:42px;
  `};
  align-items: center;
  margin-bottom: 32px;
  justify-content: start;
  > * {
    -webkit-text-fill-color: transparent;
  }
`;

export const HeroLead = styled.div`
  font-weight: 400;
  line-height: 93.06px;
`;

export const HeroSub = styled.div`
  font-weight: 600;
`;
export const HeaderEyebrow = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 117.7%;
  margin-bottom: 16px;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: #556de7;
`;
