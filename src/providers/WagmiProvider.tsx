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
import { PropsWithChildren, ReactNode } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { SUPPORT_CHAINS_RAINBOW_KIT } from '../constants';

if (!process.env.REACT_APP_ALCHEMY_API_KEY) {
  console.log('proceess.env', process.env.APP_ENV);
  throw new Error('Missing REACT_APP_ALCHEMY_API_KEY env var');
}

export const { chains, provider } = configureChains(SUPPORT_CHAINS_RAINBOW_KIT, [
  alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY as string }),
  publicProvider(),
]);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains }),
      argentWallet({ chains }),
      coinbaseWallet({ appName: 'Nimi', chains }),
      rainbowWallet({ chains }),
      ledgerWallet({ chains }),
      injectedWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

export function WagmiProvider({ children }: PropsWithChildren) {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}
