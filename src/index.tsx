import './i18n';

import { Web3ReactProvider } from '@web3-react/core';

import { createRoot } from 'react-dom/client';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { getWeb3ReactProviderConnectors, Web3ConnectorsContext, Web3ConnectorsProvider } from './connectors';
import { App } from './pages/App';
import { store } from './state';
import { FixedGlobalStyle, ThemedGlobalStyle, ThemeProvider } from './theme';

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false;
}

/*
window.addEventListener('error', (error) => {
  console.error(`${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`);
});
*/

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ReduxStoreProvider store={store}>
    <FixedGlobalStyle />
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
              <ThemeProvider>
                <ThemedGlobalStyle />
                <HashRouter>
                  <App />
                </HashRouter>
              </ThemeProvider>
            </Web3ReactProvider>
          );
        }}
      </Web3ConnectorsContext.Consumer>
    </Web3ConnectorsProvider>
  </ReduxStoreProvider>
);
