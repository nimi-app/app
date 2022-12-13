import './i18n';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './pages/App';
import { ReactQueryProvider, ReduxProvider } from './providers';
import { FixedGlobalStyle, ThemedGlobalStyle, ThemeProvider } from './theme';

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false;
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <ReduxProvider>
      <ReactQueryProvider>
        <FixedGlobalStyle />
        <ThemeProvider>
          <ThemedGlobalStyle />
          <App />
        </ThemeProvider>
      </ReactQueryProvider>
    </ReduxProvider>
  </StrictMode>
);
