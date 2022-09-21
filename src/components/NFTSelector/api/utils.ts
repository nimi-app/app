import { OpenSeaAsset } from 'opensea-js/lib/types';
import { NFTAsset } from '../NFTSelector.types';

/**
 * Remove ENS name from search term
 * @param asset
 * @returns boolean
 */
export function isENSName(asset: NFTAsset): boolean {
  return (
    asset.assetContract.address.toLowerCase() === '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85' ||
    asset.assetContract.name === 'ENS'
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
    value: `${asset.tokenAddress} -${asset.tokenId}`,
  };
}
