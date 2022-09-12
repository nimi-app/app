import { OpenSeaAPI, Network } from 'opensea-js';

export interface FetchOpenSeaAssetsParams {
  address: string;
  cursor?: string;
}

export function fetchAssets({ address, cursor }: FetchOpenSeaAssetsParams) {
  const opensea = new OpenSeaAPI({
    networkName: Network.Main,
  });

  return opensea.getAssets({ owner: address, cursor });
}
