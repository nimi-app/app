import { useMemo } from 'react';
import { useENSPublicResolverContract } from './useENSPublicResolverContract';
import contentHash from 'content-hash';
import nameHash from '@ensdomains/eth-ens-namehash';
import { ContractTransaction } from 'ethers';
import { EnsPublicResolver } from '../generated/contracts';

export interface UseSetContentHash {
  setContentHash: null | (() => Promise<ContractTransaction>);
}

export interface SetENSNameContentParams {
  contract: EnsPublicResolver;
  name: string;
  content: string;
}

/**
 * Direct call to the ENS public resolver contract to set the content hash of a name
 */
export function setENSNameContentHash({ contract, name, content }: SetENSNameContentParams) {
  const ensNode = nameHash.hash(name);
  const formattedHash = `0x${contentHash.fromIpfs(content)}`;

  return contract.setContenthash(ensNode, formattedHash);
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
        setENSNameContentHash({ contract: publicResolverContract, name: ensName, content: ipfsHash }),
    };
  }, [ensName, ipfsHash, publicResolverContract]);
}
