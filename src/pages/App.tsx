import { Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createBrowserRouter, Navigate, RouterProvider, useParams } from 'react-router-dom';

import { CreateNimiPage } from './CreateNimiPage/CreateNimiPage';
import DomainsHomePage from './DomainsHome';
import { Landing } from './Landing/Landing';
import NimiPage from './NimiPage';
import { useRainbow } from '../hooks/useRainbow';
import '@rainbow-me/rainbowkit/styles.css';
import { PageLayout } from '../layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: 'domains',
    element: <PageLayout />,
    children: [
      {
        path: 'all',
        element: <DomainsHomePage />,
      },
      {
        path: ':ensName',
        element: <CreateNimiPage />,
      },
    ],
  },
  {
    path: '/:nimiUsername',
    element: <NimiPage />,
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
