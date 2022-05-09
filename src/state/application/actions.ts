import { createAction } from '@reduxjs/toolkit';
import { ApplicationState } from './reducer';

export enum ApplicationModal {
  SETTINGS,
  WALLET_SWITCHER,
  NETWORK_SWITCHER,
  ETHEREUM_OPTION,
  NETWORK_SWITCHER_FROM,
  NETWORK_SWITCHER_TO,
  UNSUPPORTED_NETWORK,
}

export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal');
export const setConnectorInfo = createAction<Pick<ApplicationState, 'account' | 'chainId'>>(
  'application/setConnectorInfo'
);
