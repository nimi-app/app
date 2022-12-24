import { Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { useRainbow } from '../hooks/useRainbow';
import { CreateNimiPage } from './CreateNimiPage';
import { DomainsHome } from './DomainsHome';
import { Landing } from './Landing';

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
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export function App() {
  const { chains } = useRainbow();

  return (
    <RainbowKitProvider
      modalSize="compact"
      chains={chains as Chain[]}
      appInfo={{
        appName: 'Nimi',
      }}
    >
      <RouterProvider router={router} />
    </RainbowKitProvider>
  );
}
