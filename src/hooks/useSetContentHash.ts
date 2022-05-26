import { useMemo } from 'react';
import { useENSResolverContract } from './useContract';
import { TransactionResponse } from '@ethersproject/providers';
import { fromIpfs } from 'content-hash';

/**
 * Returns a function that sets content hash for a given ENS name.
 */
export function useSetContentHash(ipfsHash?: string, ensNode?: string): null | (() => Promise<TransactionResponse>) {
  const publicResolverContract = useENSResolverContract();
  const formattedHash = fromIpfs(ipfsHash);

  return useMemo(() => {
    if (!publicResolverContract || !ipfsHash || !ensNode) return null;
    return async () => {
      return publicResolverContract.setContentHash(ensNode, formattedHash);
    };
  }, [formattedHash, ensNode, ipfsHash, publicResolverContract]);
}
