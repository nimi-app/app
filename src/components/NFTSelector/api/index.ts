import { Network, OpenSeaAPI } from 'opensea-js';

export interface FetchOpenSeaAssetsParams {
  ensAddress: string;
  cursor?: string;
}

export function fetchAssets({ ensAddress, cursor }: FetchOpenSeaAssetsParams) {
  const opensea = new OpenSeaAPI({
    networkName: Network.Main,
  });

  return opensea.getAssets({ owner: ensAddress, cursor });
}
