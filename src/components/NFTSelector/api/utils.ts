import type { NFTAsset } from '../NFTSelector.types';

import type { OpenSeaAsset } from '.';

/**
 * Remove ENS name from search term
 * @param asset
 * @returns boolean
 */
export function isENSName(asset: NFTAsset): boolean {
  return (
    asset.asset_contract.address.toLowerCase() === '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85' ||
    asset.asset_contract.name === 'ENS'
  );
}

/**
 * Transform OpenSea asset to NFTAsset
 * @param asset
 * @returns
 */
export function mapOpenSeaAssetToNFTAsset(asset: OpenSeaAsset): NFTAsset {
  return {
    ...asset,
    value: asset.token_id,
  };
}
