import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { FixedGlobalStyle, ThemedGlobalStyle, ThemeProvider } from './theme';
import { NetworkContextName } from './constants';
import { getLibrary } from './utils/getLibrary';
import { App } from './pages/App';
import './i18n';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

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
  <StrictMode>
    <FixedGlobalStyle />
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ThemeProvider>
          <ThemedGlobalStyle />
          <HashRouter>
            <App />
          </HashRouter>
        </ThemeProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </StrictMode>
);
