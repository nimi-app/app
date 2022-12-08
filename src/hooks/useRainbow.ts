import { alchemyProvider } from 'wagmi/providers/alchemy';
import { configureChains, createClient, useProvider, useNetwork, useAccount, Client } from 'wagmi';
import { Chain, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { SUPPORT_CHAINS_RAINBOW_KIT } from '../constants';
import { publicProvider } from 'wagmi/providers/public';
import { Provider } from '@ethersproject/providers';

const { chains, provider } = configureChains(SUPPORT_CHAINS_RAINBOW_KIT, [
  alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY as string }),
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

interface RainbowHookTypes {
  client: Client<any>;
  chainId?: number;
  chains: Chain[];
  account?: string;
  provider: Provider;
  isConnected: boolean;
  isActivating: boolean;
}

export function useRainbow(): RainbowHookTypes {
  const client = wagmiClient;
  const { chain, chains } = useNetwork();
  const { address, isConnected, isConnecting } = useAccount();
  const provider = useProvider();

  return {
    client,
    chainId: chain?.id,
    chains,
    account: address,
    provider,
    isConnected,
    isActivating: isConnecting,
  };
}
