import { ApolloProvider } from '@apollo/client';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, PropsWithChildren, useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { useTheme } from 'styled-components';

import { defaultEnsClient, ensClients } from '../apollo/client';
import { WalletModal } from '../components/WalletModal';
import { getWeb3ReactProviderConnectors, Web3ConnectorsContext, Web3ConnectorsProvider } from '../connectors';
import { useActiveWeb3React } from '../hooks/useWeb3';
import { store } from '../state';
import { FixedGlobalStyle, ThemedGlobalStyle, ThemeProvider } from '../theme';
import { loadFathom } from '../utils';

if (typeof window !== 'undefined' && 'ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false;
}

const AppRoot: FC<PropsWithChildren> = ({ children }) => {
  const { chainId } = useActiveWeb3React();
  const theme = useTheme();

  return (
    <SkeletonTheme baseColor={theme.bg3} highlightColor={theme.bg2}>
      <ApolloProvider client={ensClients[chainId as number] || defaultEnsClient}>
        <WalletModal />
        <ThemedGlobalStyle />
        {children}
      </ApolloProvider>
    </SkeletonTheme>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Load Fathom if it's set in .env
    if (process.env.REACT_APP_FATHOM_SITE_ID) {
      loadFathom(process.env.REACT_APP_FATHOM_SITE_ID);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ReduxStoreProvider store={store}>
        <FixedGlobalStyle />
        <ThemeProvider>
          <Web3ConnectorsProvider>
            <Web3ConnectorsContext.Consumer>
              {(context) => {
                if (!context) {
                  throw new Error('Web3ConnectorsContext is not available');
                }
                // Web3ReactProvider requires a 2d array of connectors
                const providerConnectors = getWeb3ReactProviderConnectors(context.connectors);
                return (
                  <Web3ReactProvider connectors={providerConnectors}>
                    <AppRoot>
                      <Component {...pageProps} />
                    </AppRoot>
                  </Web3ReactProvider>
                );
              }}
            </Web3ConnectorsContext.Consumer>
          </Web3ConnectorsProvider>
        </ThemeProvider>
      </ReduxStoreProvider>
    </>
  );
}
