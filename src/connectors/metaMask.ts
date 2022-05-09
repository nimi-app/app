import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { ChainId } from '../constants';

export const [metaMask, hooks, store] = initializeConnector<MetaMask>(
  (actions) => new MetaMask(actions),
  [ChainId.MAINNET, ChainId.RINKEBY]
);
