import type { OpenSeaAsset } from './api';

export type NFTAsset = OpenSeaAsset & {
  value: string;
};

export interface BaseCommonProps<Option = NFTAsset> {
  ensAddress: string;
  isMulti?: boolean;
  onChange?: (newValue?: Option) => void;
  initialValue?: string;
}

export type NFTSelectorProps = Omit<BaseCommonProps, 'isMulti'>;
