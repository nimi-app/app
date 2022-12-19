import axios from 'axios';
import { CID } from 'multiformats/cid';
import { useEffect, useState } from 'react';

import { ChainId } from '../constants';
import { useRainbow } from './useRainbow';

const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';

export interface ENSMetadata {
  uri: string;
  host_meta: {
    chain_id: number;
    namespace: string;
    contract_address: string;
    token_id: string;
    reference_url: string;
  };
  is_owner: boolean;
  description: string;
  image: string;
  name: string;
}

export interface UseENSMetadataResult {
  loading: boolean;
  data?: ENSMetadata;
}

export function isCID(hash: string) {
  try {
    if (typeof hash === 'string') {
      return Boolean(CID.parse(hash));
    }
    return Boolean(CID.asCID(hash));
  } catch (e) {
    return false;
  }
}

// Map chainId to network name for fetch request
const supportedENSNetworks: Record<number, string> = {
  [ChainId.MAINNET]: 'mainnet',
  [ChainId.GOERLI]: 'goerli',
};

// List of chains where ENS is deployed
const supportedENSChainIds = [ChainId.MAINNET, ChainId.GOERLI];

/**
 * Does a lookup for an ENS name to find its avatar details, uses ENS Domains metadata API
 * docs: https://metadata.ens.domains/docs#/paths/~1%7BnetworkName%7D~1avatar~1%7Bname%7D~1meta/get
 */
export function useENSMetadata(customENSLookup?: string): UseENSMetadataResult {
  const { chainId } = useRainbow();
  const [ensData, setData] = useState<ENSMetadata>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // ENS supports Mainnet and Goerli
    if (!chainId || !supportedENSChainIds.includes(chainId) || !customENSLookup) {
      setLoading(false);
      return;
    }
    const networkName = supportedENSNetworks[chainId];
    axios
      .get<ENSMetadata>(`https://metadata.ens.domains/${networkName}/avatar/${customENSLookup}/meta`)
      .then(({ data: ensData }) => {
        if ('image' in ensData && ensData.image) {
          if (ensData.image.startsWith('ipfs://ipfs/')) {
            ensData.image = ensData.image.replace('ipfs://ipfs/', IPFS_GATEWAY);
          } else if (ensData.image.startsWith('ipfs://')) {
            ensData.image = ensData.image.replace('ipfs://', IPFS_GATEWAY);
          } else if (ensData.image.startsWith('ipfs/')) {
            ensData.image = ensData.image.replace('ipfs/', IPFS_GATEWAY);
          } else if (isCID(ensData.image)) {
            ensData.image = `${IPFS_GATEWAY}${ensData.image}`;
          }
        }
        setData(ensData);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.error('useENSMetadata error: ', e);
      });
  }, [chainId, customENSLookup]);

  return {
    loading,
    data: ensData,
  };
}
