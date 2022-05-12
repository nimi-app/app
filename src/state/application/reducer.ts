import { createReducer } from '@reduxjs/toolkit';
import { ChainId } from '../../constants';
import { ApplicationModal, setOpenModal, setConnectorInfo } from './actions';

export interface ApplicationState {
  readonly openModal: ApplicationModal | null;
  readonly chainId: ChainId | undefined;
  readonly account: string | null | undefined;
}

export const initialState: ApplicationState = {
  openModal: null,
  chainId: undefined,
  account: null,
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
);
