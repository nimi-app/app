import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';

import { getContract } from '../utils';
import { useAccount, useProvider, useRainbow } from './useRainbow';
/**
 *
 * @param address The address of the contract to use
 * @param ABI The ABI of the contract to use
 * @param withSignerIfPossible Whether to use a signer if one is available
 * @returns The contract instance
 */
export function useContract<T = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const provider = useProvider();
  const account = useAccount();

  return useMemo(() => {
    if (!address || !ABI || !provider) return null;
    try {
      return getContract<T>(address, ABI, provider as any, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, provider, withSignerIfPossible, account]);
}
