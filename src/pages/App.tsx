import { Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { CreateNimiPage } from './CreateNimiPage/CreateNimiPage';
import DomainsHomePage from './DomainsHome';
import { Landing } from './Landing/Landing';
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
