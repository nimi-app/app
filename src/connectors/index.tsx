import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import type { Connector, Web3ReactStore } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

import { coinbaseWallet, hooks as coinbaseWalletHooks, store as coinbaseWalletStore } from './coinbaseWallet';
import { metaMask, hooks as metaMaskHooks, store as metaMaskStore } from './metaMask';
import { walletConnect, hooks as walletConnectHooks, store as walletConnectStore } from './walletConnect';

/**
 * Returns the name of the connector, otherwise 'Unknown' if not registered.
 * @param connector the Connector instance to get the name of
 * @returns the name of the connector
 */
export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  if (connector instanceof WalletConnect) return 'WalletConnect';
  if (connector instanceof CoinbaseWallet) return 'Coinbase Wallet';
  if (connector instanceof Network) return 'Network';
  return 'Unknown';
}

export interface ConnectorInfo {
  name: string;
  connector: Connector;
  store: Web3ReactStore;
  hooks: Web3ReactHooks;
}

/**
 * List of available connectors in the dapp
 */
export const connectors: ConnectorInfo[] = [
  {
    name: 'MetaMask',
    connector: metaMask,
    store: metaMaskStore,
    hooks: metaMaskHooks,
  },
  {
    name: 'WalletConnect',
    connector: walletConnect,
    store: walletConnectStore,
    hooks: walletConnectHooks,
  },
  {
    name: 'Coinbase Wallet',
    connector: coinbaseWallet,
    store: coinbaseWalletStore,
    hooks: coinbaseWalletHooks,
  },
];

/**
 * Maps connector list to approporate 2d array for Web3ReactProvider
 */
export function getWeb3ReactProviderConnectors(connectors: ConnectorInfo[]) {
  return connectors.reduce<[Connector, Web3ReactHooks, Web3ReactStore][]>((acc, { connector, hooks, store }) => {
    acc.push([connector, hooks, store]);
    return acc;
  }, []);
}

export interface ConnectorsContext {
  connectors: ConnectorInfo[];
}

export const Web3ConnectorsContext = createContext<ConnectorsContext | null>(null);

/**
 * Provides a list of connectors and their stores to the context.
 */
export const Web3ConnectorsProvider: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <Web3ConnectorsContext.Provider value={{ connectors }}>{children}</Web3ConnectorsContext.Provider>
);

/**
 * Retrieves the connectors and their stores from the context.
 */
export function useWeb3Connectors() {
  const context = useContext(Web3ConnectorsContext);

  if (context === null) {
    throw new Error('useWeb3Connectors must be used within a Web3ConnectorsProvider');
  }

  return context.connectors;
}
