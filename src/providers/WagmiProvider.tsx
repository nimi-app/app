import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit';
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

const connectors = connectorsForWallets([...wallets]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function WagmiProvider({ children }: { children: ReactNode }) {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}
