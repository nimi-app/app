import { ApolloProvider } from '@apollo/client';
import { useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Route, Routes } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { defaultEnsClient, ensClients } from '../apollo/client';
import { useActiveWeb3React } from '../hooks/useWeb3';
import { Header } from '../components/Header';

import { NotFound } from './NotFound';
import { Landing } from './Landing';
import { DomainsHome } from './Domains';
import { Footer } from '../components/Footer';
import { WalletModal } from '../components/WalletModal';
import { CreateNimiPage } from './CreateNimiPage';
import { NimiConnectPage } from '../modules/nimi-connect';
import { loadFathom } from '../utils';
import { AppWrapper } from '../modules/app-wrapper';

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
  const { chainId } = useActiveWeb3React();
  const theme = useTheme();

  useEffect(() => {
    // Load Fathom if it's set in .env
    if (process.env.REACT_APP_FATHOM_SITE_ID) {
      loadFathom(process.env.REACT_APP_FATHOM_SITE_ID);
    }
  }, []);

  return (
    <SkeletonTheme baseColor={theme.bg3} highlightColor={theme.bg2}>
      <ApolloProvider client={ensClients[chainId as number] || defaultEnsClient}>
        <WalletModal />
        <Routes>
          <Route element={<NimiConnectAppWrapper />} path="/connect" />
          <Route element={<DomainsAppWrapper />} path="domains/*" />
          <Route element={<Landing />} path="/" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </ApolloProvider>
    </SkeletonTheme>
  );
}
