import { Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useRainbow } from '../hooks/useRainbow';
import { AppWrapper } from '../modules/app-wrapper';
import { loadFathom } from '../utils';
import { CreateNimiPage } from './CreateNimiPage';
import { DomainsHome } from './domains';
import { Landing } from './Landing';

import '@rainbow-me/rainbowkit/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: 'domains/:ensName',
    element: (
      <AppWrapper header={<Header />} footer={<Footer />}>
        <CreateNimiPage />
      </AppWrapper>
    ),
  },
  {
    path: 'domains',
    element: (
      <AppWrapper header={<Header />} footer={<Footer />}>
        <DomainsHome />
      </AppWrapper>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export function App() {
  const theme = useTheme();
  const { chains } = useRainbow();

  useEffect(() => {
    if (process.env.REACT_APP_FATHOM_SITE_ID) {
      loadFathom(process.env.REACT_APP_FATHOM_SITE_ID);
    }
  }, []);

  return (
    <RainbowKitProvider modalSize="compact" chains={chains as Chain[]}>
      <RouterProvider router={router} />
    </RainbowKitProvider>
  );
}
