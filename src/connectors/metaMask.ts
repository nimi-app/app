import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { ENV_SUPPORTED_CHAIN_IDS } from '../constants';

export const [metaMask, hooks, store] = initializeConnector<MetaMask>(
  (actions) => new MetaMask(actions),
  ENV_SUPPORTED_CHAIN_IDS
);
