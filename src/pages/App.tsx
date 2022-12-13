import { Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { useRainbow } from '../hooks/useRainbow';
import { LoggedInWrapper } from '../providers';
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
      <LoggedInWrapper>
        <CreateNimiPage />
      </LoggedInWrapper>
    ),
  },
  {
    path: 'domains',
    element: (
      <LoggedInWrapper>
        <DomainsHome />
      </LoggedInWrapper>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export function App() {
  const { chains } = useRainbow();

  return (
    <RainbowKitProvider modalSize="compact" chains={chains as Chain[]}>
      <RouterProvider router={router} />
    </RainbowKitProvider>
  );
}
