import { useWeb3React } from '@web3-react/core';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as NimiLogoText } from '../../assets/svg/nimi-logo-text.svg';
// SVGs
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { useWalletSwitcherPopoverToggle } from '../../state/application/hooks';
// Styled components
import { Content, Header, HeroLead, HeroText, PageWrapper, HeaderEyebrow } from './styled';
import { ConnectButton, getDefaultWallets, useConnectModal } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Nimi',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function Landing() {
  const { t } = useTranslation(['common', 'landing']);
  const navigate = useNavigate();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
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
                        if (chain.unsupported) {
                          return (
                            <button onClick={openChainModal} type="button">
                              Wrong network
                            </button>
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
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
