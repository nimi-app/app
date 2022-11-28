import { useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Route, Routes } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { Header } from '../components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NotFound } from './NotFound';
import { Landing } from './Landing';

import { Footer } from '../components/Footer';
import { WalletModal } from '../components/WalletModal';
import { CreateNimiPage } from './CreateNimiPage';
import { NimiConnectPage } from '../modules/nimi-connect';
import { loadFathom } from '../utils';
import { AppWrapper } from '../modules/app-wrapper';
import { DomainsHome } from './Domains';

const DomainsAppWrapper = () => (
  <AppWrapper header={<Header />} footer={<Footer />}>
    <Routes>
      <Route path=":ensName" element={<CreateNimiPage />} />
      <Route path="/" element={<DomainsHome />} />
    </Routes>
  </AppWrapper>
);

const NimiConnectAppWrapper = () => (
  <AppWrapper header={<Header />} footer={<Footer />}>
    <NimiConnectPage />
  </AppWrapper>
);

export function App() {
  // const [isConnectingEagerly, setIsConnectingEagerly] = useState(true);

  const theme = useTheme();

  const queryClient = new QueryClient();

  useEffect(() => {
    // Load Fathom if it's set in .env
    if (process.env.REACT_APP_FATHOM_SITE_ID) {
      loadFathom(process.env.REACT_APP_FATHOM_SITE_ID);
    }
  }, []);

  return (
    <SkeletonTheme baseColor={theme.bg3} highlightColor={theme.bg2}>
      <QueryClientProvider client={queryClient}>
        <WalletModal />
        <Routes>
          <Route element={<NimiConnectAppWrapper />} path="/connect" />
          <Route element={<DomainsAppWrapper />} path="domains/*" />
          <Route element={<Landing />} path="/" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </QueryClientProvider>
    </SkeletonTheme>
  );
}
