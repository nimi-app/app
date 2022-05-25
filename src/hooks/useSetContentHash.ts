import { useMemo } from 'react';
import { useENSResolverContract } from './useContract';
import { TransactionResponse } from '@ethersproject/providers';

/**
 * Returns a function that sets content hash for a given ENS name.
 */
export function useSetContentHash(ipfsHash?: string, ensNode?: string): null | (() => Promise<TransactionResponse>) {
  const publicResolverContract = useENSResolverContract(true);

  return useMemo(() => {
    if (!publicResolverContract || !ipfsHash || !ensNode) return null;
    return async () => {
      return publicResolverContract.setContentHash(ensNode, ipfsHash);
    };
  }, [ipfsHash, ensNode, publicResolverContract]);
}
