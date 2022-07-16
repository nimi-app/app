import { createReducer } from '@reduxjs/toolkit';
import { ChainId } from '../../constants';
import { ApplicationModal, setOpenModal, setConnectorInfo, updateBlockNumber } from './actions';

export interface ApplicationState {
  readonly openModal: ApplicationModal | null;
  readonly chainId: ChainId | undefined;
  readonly account: string | null | undefined;
  readonly blockNumber: { readonly [chainId: number]: number };
}

export const initialState: ApplicationState = {
  openModal: null,
  chainId: undefined,
  account: null,
  blockNumber: {},
};

export const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload;
    })
    .addCase(setConnectorInfo, (state, action) => {
      const { account, chainId } = action.payload;
      state.account = account;
      state.chainId = chainId;
    })
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
      }
    })
);
