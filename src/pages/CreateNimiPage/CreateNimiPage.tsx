import { useParams } from 'react-router-dom';
import { SUPPORTED_CHAIN_IDS } from '../../constants';
import { CreateNimiContainer } from '../../components/CreateNimi/CreateNimiContainer';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { ConnectButton, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';

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

export function CreateNimiPage() {
  const { t } = useTranslation();
  const provider = wagmiClient.getProvider();
  const chainId = wagmiClient.data?.chain?.id;
  const { ensName } = useParams();

  if (!provider || !chainId || !SUPPORTED_CHAIN_IDS.includes(chainId)) {
    return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
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
                      return <Button onClick={openConnectModal}>{t('connectWallet')}</Button>;
                    }
                    if (chain.unsupported) {
                      return <Button onClick={openChainModal}>{t('error.unsupportedNetwork')}</Button>;
                    }
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </RainbowKitProvider>
      </WagmiConfig>
    );
  }

  return <CreateNimiContainer ensName={ensName as string} />;
}
