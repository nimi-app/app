import { Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { WagmiConfig } from 'wagmi';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useRainbow } from '../hooks/useRainbow';
import { AppWrapper } from '../modules/app-wrapper';
import { NimiConnectPage } from '../modules/nimi-connect';
import { loadFathom } from '../utils';
import { CreateNimiPage } from './CreateNimiPage';
import { DomainsHome } from './domains';
import { Landing } from './Landing';
import { NotFound } from './NotFound';

import '@rainbow-me/rainbowkit/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: 'domains/:ensName',
    element: <CreateNimiPage />,
  },
  {
    path: 'domains',
    element: <DomainsHome />,
  },
  {
    path: 'connect',
    element: (
      <AppWrapper header={<Header />} footer={<Footer />}>
        <NimiConnectPage />
      </AppWrapper>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

export function App() {
  const theme = useTheme();
  const { client, chains } = useRainbow();

  useEffect(() => {
    if (process.env.REACT_APP_FATHOM_SITE_ID) {
      loadFathom(process.env.REACT_APP_FATHOM_SITE_ID);
    }
  }, []);

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider modalSize="compact" chains={chains as Chain[]}>
        <SkeletonTheme baseColor={theme.bg3} highlightColor={theme.bg2}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </SkeletonTheme>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
