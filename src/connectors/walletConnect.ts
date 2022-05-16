import { initializeConnector } from '@web3-react/core';
import { WalletConnect } from '@web3-react/walletconnect';
import { URLS } from '../constants';

export const [walletConnect, hooks, store] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: URLS,
      clientMeta: {
        url: 'https://nimi.eth.limo',
        name: 'Nimi',
        description: 'Bring life to your ENS',
        icons: ['https://gateway.pinata.cloud/ipfs/QmNRpLfMXc57MPCHxd6v4Gw7iqT35XfgHw7LfXTFFWB8fy'],
      },
    }),
  Object.keys(URLS).map((chainId) => Number(chainId))
);
