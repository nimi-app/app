import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';

import { ChainId, PUBLIC_RESOLVER_ADDRESSES } from '../constants';

import { getContract } from '../utils';
import { useActiveWeb3React } from './useWeb3';
import { EnsPublicResolver__factory } from '../generated/contracts';

// returns null on errors
function useContract(generatedFactory: any, address: string | undefined, withSignerIfPossible = true): Contract | null {
  const { provider, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !generatedFactory || !provider) return null;
    try {
      return getContract(address, generatedFactory, provider, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, provider, withSignerIfPossible, account, generatedFactory]);
}

export function useENSResolverContract(withSignerIfPossible = true): Contract | null {
  const { chainId } = useActiveWeb3React();

  return useContract(
    EnsPublicResolver__factory,
    PUBLIC_RESOLVER_ADDRESSES[chainId || ChainId.MAINNET],
    withSignerIfPossible
  );
}
