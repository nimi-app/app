import { useQuery } from '@tanstack/react-query';

import { ChainId } from '../../../constants';
import { useRainbow } from '../../../hooks/useRainbow';
import { baseClient, formatEnsMetadataImage } from '../utils';

export interface ENSMetadata {
  uri: string;
  image: string;
}

// Map chainId to network name for fetch request
const supportedENSNetworks: Record<number, string> = {
  [ChainId.MAINNET]: 'mainnet',
  [ChainId.GOERLI]: 'goerli',
};

/**
 * Returns query for fetching data generated from ens name
 */
export function useEnsMetadataImage(ensName: string) {
  const { chainId } = useRainbow();
  const getEnsMetadata = async (ensName: string, chainId = 1) => {
    const networkName = supportedENSNetworks[chainId];
    const { data } = await baseClient.get<ENSMetadata>(
      `https://metadata.ens.domains/${networkName}/avatar/${ensName}/meta`
    );
    return data;
  };

  return useQuery(['fetchEnsMetadataImage', ensName, chainId], async () => await getEnsMetadata(ensName, chainId), {
    select: formatEnsMetadataImage,
  });
}
