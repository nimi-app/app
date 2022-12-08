import './i18n';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { App } from './pages/App';
import { store } from './state';
import { FixedGlobalStyle, ThemedGlobalStyle, ThemeProvider } from './theme';

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false;
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <ReduxStoreProvider store={store}>
      <FixedGlobalStyle />
      <ThemeProvider>
        <ThemedGlobalStyle />
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </ReduxStoreProvider>
  </StrictMode>
);
