import { alchemyProvider } from 'wagmi/providers/alchemy';
import { configureChains, chain, createClient } from 'wagmi';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ALCHEMY_ID, SUPPORT_CHAINS_RAINBOW_KIT } from '../constants';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [alchemyProvider({ apiKey: ALCHEMY_ID as string }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Nimi',
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

export function useRainbow() {
  return wagmiClient;
}

export const rainbowChains = chains;
