import { Provider } from '@ethersproject/providers';

import { Chain } from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork, useProvider } from 'wagmi';

interface RainbowHookTypes {
  chainId?: number;
  chains: Chain[];
  account?: string;
  provider: Provider;
  isConnected: boolean;
  isActivating: boolean;
}

export function useRainbow(): RainbowHookTypes {
  const { chain, chains } = useNetwork();
  const { address, isConnected, isConnecting } = useAccount();
  const provider = useProvider();

  return {
    chainId: chain?.id,
    chains,
    account: address,
    provider,
    isConnected,
    isActivating: isConnecting,
  };
}
