import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';
import { ENV_SUPPORTED_CHAIN_IDS, URLS } from '../constants';
import { ChainId } from '../constants';

export const [coinbaseWallet, hooks, store] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet(actions, {
      url: URLS[ChainId.MAINNET][0],
      appName: 'Nimi',
      darkMode: false,
      appLogoUrl: 'https://gateway.pinata.cloud/ipfs/QmNRpLfMXc57MPCHxd6v4Gw7iqT35XfgHw7LfXTFFWB8fy',
    }),
  ENV_SUPPORTED_CHAIN_IDS
);
