import { Chain } from '@rainbow-me/rainbowkit';
import { ProviderWithFallbackConfig } from '@wagmi/core';
import { useAccount, useNetwork, useProvider } from 'wagmi';

import { ChainId } from '../constants';

interface RainbowHookTypes {
  chainId?: ChainId;
  chains: Chain[];
  account?: string;
  provider: ProviderWithFallbackConfig;
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
