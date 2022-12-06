import { alchemyProvider } from 'wagmi/providers/alchemy';
import { configureChains, chain, createClient } from 'wagmi';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ALCHEMY_ID, SUPPORT_CHAINS_RAINBOW_KIT } from '../constants';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(SUPPORT_CHAINS_RAINBOW_KIT, [
  alchemyProvider({ apiKey: ALCHEMY_ID as string }),
  publicProvider(),
]);

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

export function useChainId() {
  return wagmiClient.data?.chain?.id;
}

export function useAccount() {
  return wagmiClient.data?.account;
}

export function useProvider() {
  return wagmiClient.getProvider();
}

export function useRainbowChains() {
  const chains = wagmiClient.chains;
  return chains;
}

export const rainbowChains = chains;
