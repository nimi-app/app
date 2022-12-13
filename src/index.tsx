import './i18n';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxStoreProvider } from 'react-redux';

import { App } from './pages/App';
import { store } from './state';
import { FixedGlobalStyle, ThemedGlobalStyle, ThemeProvider } from './theme';

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <ReduxStoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <FixedGlobalStyle />
        <ThemeProvider>
          <ThemedGlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxStoreProvider>
  </StrictMode>
);
