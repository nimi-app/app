import { ContractTransaction } from '@ethersproject/contracts';

import { encodeContenthash, namehash } from '@ensdomains/ui';
import { useMemo } from 'react';

import { EnsPublicResolver } from '../generated/contracts';
import { useENSPublicResolverContract } from './useENSPublicResolverContract';

export interface UseSetContentHash {
  setContentHash: null | (() => Promise<ContractTransaction>);
}

export interface SetENSNameContentParams {
  contract: EnsPublicResolver;
  name: string;
  contentHash: string;
}

/**
 * Direct call to the ENS public resolver contract to set the content hash of a name
 */
export function setENSNameContentHash(params: SetENSNameContentParams) {
  const ensNode = namehash(params.name);
  const { encoded, error } = encodeContenthash(params.contentHash);

  if (error) {
    throw new Error(error);
  }

  return params.contract.setContenthash(ensNode, encoded as any);
}

/**
 * Returns a function that sets content hash for a given ENS name.
 */
export function useSetContentHash(ipfsHash?: string, ensName?: string): UseSetContentHash {
  const publicResolverContract = useENSPublicResolverContract();

  return useMemo(() => {
    if (!publicResolverContract || !ipfsHash || !ensName) {
      return {
        setContentHash: null,
      };
    }

    return {
      setContentHash: () =>
        setENSNameContentHash({ contract: publicResolverContract, name: ensName, contentHash: ipfsHash }),
    };
  }, [ensName, ipfsHash, publicResolverContract]);
}
