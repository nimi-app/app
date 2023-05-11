import { ContractTransaction } from '@ethersproject/contracts';

import { encodeContenthash, namehash } from '@ensdomains/ui';
import { useMemo } from 'react';

import { useENSNameResolverContract } from './useENSNameResolverContract';
import { EnsPublicResolver } from '../generated/contracts';

export interface UseSetContentHash {
  setContentHash: null | (() => Promise<ContractTransaction>);
}

export interface SetENSNameContentParams {
  contract: EnsPublicResolver;
  name: string;
  /**
   * The content hash URI to set: e.g. ipfs://bafybeib7z3q2
   */
  contentHashURI: string;
}

/**
 * Direct call to the ENS public resolver contract to set the content hash of a name
 */
export function setENSNameContentHash(params: SetENSNameContentParams) {
  const ensNode = namehash(params.name);
  const { encoded, error } = encodeContenthash(params.contentHashURI);

  if (error) {
    throw new Error(error);
  }

  return params.contract.setContenthash(ensNode, encoded as any);
}

/**
 * Returns a function that sets content hash for a given ENS name.
 */
export function useSetContentHash({
  contentHashURI,
  ensName,
}: {
  contentHashURI?: string;
  ensName?: string;
}): UseSetContentHash {
  const { data: resolverContract } = useENSNameResolverContract(ensName, true);

  return useMemo(() => {
    if (!resolverContract || !contentHashURI || !ensName) {
      return {
        setContentHash: null,
      };
    }

    return {
      setContentHash: () => setENSNameContentHash({ contract: resolverContract, name: ensName, contentHashURI }),
    };
  }, [ensName, contentHashURI, resolverContract]);
}
