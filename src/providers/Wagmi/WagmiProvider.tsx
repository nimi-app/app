import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { PropsWithChildren } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { rainbowWeb3AuthConnector } from './Web3Auth';
import { SUPPORT_CHAINS_RAINBOW_KIT } from '../../constants';

if (!process.env.REACT_APP_ALCHEMY_API_KEY) {
  throw new Error('Missing REACT_APP_ALCHEMY_API_KEY env var');
}

export const { chains, provider } = configureChains(SUPPORT_CHAINS_RAINBOW_KIT, [
  alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY as string }),
  publicProvider(),
]);

const env = process.env.REACT_APP_EVENT_NAME;

const wallets =
  env === 'RIO'
    ? [rainbowWeb3AuthConnector({ chains }) as any]
    : [
        metaMaskWallet({ chains }),
        argentWallet({ chains }),
        coinbaseWallet({ appName: 'Nimi', chains }),
        rainbowWallet({ chains }),
        ledgerWallet({ chains }),
        injectedWallet({ chains }),
        walletConnectWallet({ chains }),
      ];

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets,
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function WagmiProvider({ children }: PropsWithChildren) {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}
