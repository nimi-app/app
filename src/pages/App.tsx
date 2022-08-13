import { ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Route, Routes } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import { defaultEnsClient, ensClients } from '../apollo/client';
import { useActiveWeb3React } from '../hooks/useWeb3';
import { Header } from '../components/Header';

import { NotFound } from './NotFound';
import { Landing } from './Landing';
import { DomainsHome } from './Domains';
import { ReactComponent as NimiLogo } from '../assets/svg/nimi-logo-no-text.svg';
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

const AppLoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  > svg {
    width: 100px;
    width: 25vw;
    max-width: 200px;
  }
`;

export function App() {
  const [isConnectingEagerly, setIsConnectingEagerly] = useState(true);
  const { chainId, connector } = useActiveWeb3React();
  const theme = useTheme();

  useEffect(() => {
    // Load Fathom if it's set in .env
    if (process.env.REACT_APP_FATHOM_SITE_ID) {
      loadFathom(process.env.REACT_APP_FATHOM_SITE_ID);
    }

    if (!connector?.connectEagerly) {
      return setIsConnectingEagerly(false);
    }

    connector.connectEagerly()?.then(() => setIsConnectingEagerly(false));
    // eslint-disable-next-line
  }, []);

  if (isConnectingEagerly) {
    return (
      <AppLoaderContainer>
        <NimiLogo />
      </AppLoaderContainer>
    );
  }

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
