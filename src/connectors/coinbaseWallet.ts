import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';
import { URLS } from '../constants';
import { ChainId } from '../constants';

export const [coinbaseWallet, hooks, store] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet(actions, {
      url: URLS[ChainId.MAINNET][0],
      appName: 'web3-react',
    }),
  [ChainId.MAINNET, ChainId.RINKEBY, ChainId.GOERLI]
);
