import { alchemyProvider } from 'wagmi/providers/alchemy';
import { configureChains, createClient } from 'wagmi';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ALCHEMY_ID, SUPPORT_CHAINS_RAINBOW_KIT } from '../constants';
const { chains, provider } = configureChains(SUPPORT_CHAINS_RAINBOW_KIT, [
  alchemyProvider({ apiKey: ALCHEMY_ID as string }),
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
