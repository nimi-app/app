import { Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { useRainbow } from '../hooks/useRainbow';
import { AppWrapper } from '../layout';
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
    path: 'domains',
    element: <AppWrapper />,
    children: [
      {
        path: 'all',
        element: <DomainsHome />,
      },
      {
        path: ':ensName',
        element: <CreateNimiPage />,
      },
    ],
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
