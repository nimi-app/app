import { providers } from 'ethers';

import { CustomWalletLinkConnector } from './CustomWalletLinkConnector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { CustomNetworkConnector } from './CustomNetworkConnector';
import { getLibrary } from '../utils/getLibrary';

export const INFURA_PROJECT_ID = '0ebf4dd05d6740f482938b8a80860d13';

export const network = new CustomNetworkConnector({
  urls: {
    100: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  },
  defaultChainId: 100,
});

export const injected = new InjectedConnector({
  supportedChainIds: [100, 4],
});

let networkLibrary: providers.Web3Provider | undefined;
export function getNetworkLibrary(): providers.Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider));
}

// walletLink implements Metamask's RPC and should respond to most it's methods: window.ethereum.isMetaMask === true
// More info: https://github.com/walletlink/walletlink
export const walletLink = new CustomWalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  appName: 'Nimi',
  supportedChainIds: [100, 4],
});
