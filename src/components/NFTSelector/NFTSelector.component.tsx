import { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

import { fetchAssets } from './api';
import { isENSName, mapOpenSeaAssetToNFTAsset } from './api/utils';
import { AssetListInnerWrapper, AssetListItem /* SearchBar */ } from './NFTSelector.styled';
import { NFTAsset, NFTSelectorProps } from './NFTSelector.types';
import { AssetCard } from './partials/AssetCard/AssetCard';
import { Button } from '../Button';
import { Loader, LoaderWrapper } from '../Loader';

export function NFTSelector({ ensAddress, onChange }: NFTSelectorProps) {
  const [isFetching, setIsFetching] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [assetList, setAssetList] = useState<NFTAsset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<NFTAsset>();
  // const [searchQuery, setSearchQuery] = useState('');

  // Used to keep track of the last cursor
  const [nextCursor, setNextCursor] = useState<string>();

  const fetchMoreOpenSeaAssets = async () => {
    if (isFetchingMore) {
      return;
    }

    setIsFetchingMore(true);
    fetchAssets({
      address: ensAddress,
      cursor: nextCursor,
    }).then(({ assets, next }) => {
      unstable_batchedUpdates(() => {
        const appendedAssets = assets.map(mapOpenSeaAssetToNFTAsset).filter((asset) => !isENSName(asset));
        setAssetList((prev) => [...prev, ...appendedAssets]);

        if (next !== null) {
          setNextCursor(next);
        }

        setIsFetchingMore(false);
      });
    });
  };

  useEffect(() => {
    // reset state
    unstable_batchedUpdates(() => {
      setIsFetching(true);
      setAssetList([]);
      setNextCursor(undefined);
      setIsFetchingMore(false);
    });

    fetchAssets({
      address: ensAddress,
      cursor: nextCursor,
    }).then(({ assets, next }) => {
      unstable_batchedUpdates(() => {
        const appendedAssets = assets.map(mapOpenSeaAssetToNFTAsset).filter((asset) => !isENSName(asset));
        setAssetList(appendedAssets);
        setIsFetching(false);
        if (next !== null) {
          setNextCursor(next);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ensAddress]);

  if (isFetching) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  return (
    <>
      {/* <SearchBar
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      /> */}
      <AssetListInnerWrapper>
        {assetList.map((asset) => {
          const isSelected = selectedAsset?.value === asset.value;

          return (
            <AssetListItem key={asset.value}>
              <AssetCard
                asset={asset}
                isSelected={isSelected}
                onClick={() => {
                  const nextSelectedAssets = isSelected ? undefined : asset;
                  setSelectedAsset(nextSelectedAssets);
                  onChange?.(nextSelectedAssets);
                }}
              />
            </AssetListItem>
          );
        })}
      </AssetListInnerWrapper>
      {nextCursor && (
        <Button onClick={fetchMoreOpenSeaAssets} disabled={isFetchingMore}>
          {isFetchingMore ? <Loader /> : 'Load more'}
        </Button>
      )}
    </>
  );
}
