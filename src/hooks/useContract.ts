import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';

import { MULTICALL2_ADDRESS } from '../constants';
import MULTICALL2_ABI from '../abis/multicall2.json';
import ENS_PUBLIC_RESOLVER_ABI from '../abis/ens-public-resolver.json';
import ERC20_ABI from '../abis/erc20.json';
import ENS_ABI from '../abis/ens-registrar.json';
import { ERC20_BYTES32_ABI } from '../abis/erc20';

import { getContract } from '../utils';
import { useActiveWeb3React } from './useWeb3';

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { provider, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !provider) return null;
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, provider, withSignerIfPossible, account]);
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React();
  let address: string | undefined;
  if (chainId && [100, 4].includes(chainId)) {
    address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
  }
  return useContract(address, ENS_ABI, withSignerIfPossible);
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(MULTICALL2_ADDRESS[chainId || 100], MULTICALL2_ABI, false);
}
