import { useMemo } from 'react';
import { useENSPublicResolverContract } from './useENSPublicResolverContract';
import nameHash from '@ensdomains/eth-ens-namehash';
import { ContractTransaction } from 'ethers';
import { EnsPublicResolver } from '../generated/contracts';
import { encodeContenthash } from '@ensdomains/ui';
import { useConnection } from '@solana/wallet-adapter-react';
import { updateNameRegistryData } from '@bonfida/spl-name-service';

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
  const ensNode = nameHash.hash(params.name);
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

/**
 * Direct call to the ENS public resolver contract to set the content hash of a name
 */
export async function setBonfidaContentHash(cid, name, connection) {
  // const ensNode = nameHash.hash(params.name);
  // const { encoded, error } = encodeContenthash(params.contentHash);
  const data = Buffer.from(cid);
  console.log('cid', cid);
  console.log('name', name);

  // The offset to which the data should be written into the registry, usually 0
  const offset = 0;
  const reponse = await updateNameRegistryData(connection, name, offset, data, undefined);

  return reponse;
}
