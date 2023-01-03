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
import { ReactNode } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { SUPPORT_CHAINS_RAINBOW_KIT } from '../constants';

export const { chains, provider } = configureChains(SUPPORT_CHAINS_RAINBOW_KIT, [
  alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY as string }),
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
  autoConnect: true,
  connectors,
  provider,
});

export function WagmiProvider({ children }: { children: ReactNode }) {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}
