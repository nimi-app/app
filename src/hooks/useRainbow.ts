import { alchemyProvider } from 'wagmi/providers/alchemy';
import { configureChains, createClient, useProvider, useNetwork, useAccount } from 'wagmi';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { SUPPORT_CHAINS_RAINBOW_KIT } from '../constants';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(SUPPORT_CHAINS_RAINBOW_KIT, [
  alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
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
  const client = wagmiClient;
  const { chain, chains } = useNetwork();
  const { address } = useAccount();
  const provider = useProvider();
  return {
    client,
    chainId: chain?.id,
    chains,
    account: address,
    provider,
    isConnected: client.status === 'connected',
    isActivating: client.status === 'connecting',
  };
}
