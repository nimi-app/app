import type { OpenSeaAsset } from 'opensea-js/lib/types';

export type NFTAsset = OpenSeaAsset & {
  value: string;
};

export interface BaseCommonProps<Option = NFTAsset> {
  /**
   * Address of the wallet to fetch NFTs from
   */
  address: string;
  /**
   * Select selection to one or multiple
   */
  isMulti?: boolean;
  /**
   * Callback when NFTs are selected
   */
  onChange?: (newValue?: Option) => void;
  /**
   * Initial selected NFT
   */
  initialValue?: string;
}

export type NFTSelectorProps = Omit<BaseCommonProps, 'isMulti'>;
