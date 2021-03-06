import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { CID } from 'multiformats/cid';
import { ChainId } from '../constants';

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
  [ChainId.RINKEBY]: 'rinkeby',
  [ChainId.GOERLI]: 'goerli',
};

// List of chains where ENS is deployed
const supportedENSChainIds = [ChainId.MAINNET, ChainId.RINKEBY, ChainId.GOERLI];

/**
 * Does a lookup for an ENS name to find its avatar details, uses ENS Domains metadata API
 * docs: https://metadata.ens.domains/docs#/paths/~1%7BnetworkName%7D~1avatar~1%7Bname%7D~1meta/get
 */
export function useENSMetadata(customENSLookup?: string): UseENSMetadataResult {
  const [data, setData] = useState<ENSMetadata>();
  const [loading, setLoading] = useState<boolean>(true);
  const { chainId, ENSName } = useWeb3React();

  useEffect(() => {
    // ENS supports Mainnet and Rinkeby
    if (!chainId || !supportedENSChainIds.includes(chainId) || !ENSName) {
      setLoading(false);
      return;
    }

    const networkName = supportedENSNetworks[chainId];

    axios
      .get<ENSMetadata>(
        `https://metadata.ens.domains/${networkName}/avatar/${customENSLookup ? customENSLookup : ENSName}/meta`
      )
      .then(({ data }) => {
        if ('image' in data && data.image) {
          if (data.image.startsWith('ipfs://ipfs/')) {
            data.image = data.image.replace('ipfs://ipfs/', IPFS_GATEWAY);
          } else if (data.image.startsWith('ipfs://')) {
            data.image = data.image.replace('ipfs://', IPFS_GATEWAY);
          } else if (data.image.startsWith('ipfs/')) {
            data.image = data.image.replace('ipfs/', IPFS_GATEWAY);
          } else if (isCID(data.image)) {
            data.image = `${IPFS_GATEWAY}${data.image}`;
          }
        }
        setData(data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.error('useENSMetadata error: ', e);
      });
  }, [chainId, ENSName, customENSLookup]);

  return {
    loading,
    data,
  };
}
