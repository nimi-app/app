import { useMemo } from 'react';
import { useENSPublicResolverContract } from './useENSPublicResolverContract';
import { TransactionResponse } from '@ethersproject/providers';
import contentHash from 'content-hash';
import nameHash from '@ensdomains/eth-ens-namehash';

/**
 * Returns a function that sets content hash for a given ENS name.
 */
export function useSetContentHash(ipfsHash?: string, ensName?: string): null | (() => Promise<TransactionResponse>) {
  const publicResolverContract = useENSPublicResolverContract();

  return useMemo(() => {
    if (!publicResolverContract || !ipfsHash || !ensName) return null;

    const ensNode = nameHash.hash(ensName);
    const formattedHash = contentHash.fromIpfs(ipfsHash);

    return async function setContenthash() {
      return publicResolverContract.setContenthash(ensNode, '0x' + formattedHash);
    };
  }, [ensName, ipfsHash, publicResolverContract]);
}
