import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { argentWallet, imTokenWallet, ledgerWallet, omniWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { ReactNode } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { SUPPORT_CHAINS_RAINBOW_KIT } from '../constants';

export const { chains, provider } = configureChains(SUPPORT_CHAINS_RAINBOW_KIT, [
  alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY as string }),
  publicProvider(),
]);

const { wallets } = getDefaultWallets({
  appName: 'Nimi',
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'More',
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      omniWallet({ chains }),
      imTokenWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

export function WagmiProvider({ children }: { children: ReactNode }) {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}
