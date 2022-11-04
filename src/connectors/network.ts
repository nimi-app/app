import { initializeConnector } from '@web3-react/core';
import { Network } from '@web3-react/network';

import { ENV_SUPPORTED_CHAIN_IDS, URLS } from '../constants';

export const [network, hooks, store] = initializeConnector<Network>(
  (actions) => new Network(actions, URLS),
  ENV_SUPPORTED_CHAIN_IDS
);
