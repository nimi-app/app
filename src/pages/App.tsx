import { ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Route, Routes } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import { clients as subgraphClients, defaultClient as defaultSubgraphClient } from '../apollo/client';
import { ReactComponent as NimiLogo } from '../assets/svg/nimi-logo-no-text.svg';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { WalletModal } from '../components/WalletModal';
import { useActiveWeb3React } from '../hooks/useWeb3';
import { CreateNimiPage } from './CreateNimiPage';
import { DomainsHome } from './Domains';
import { Landing } from './Landing';
import { NotFound } from './NotFound';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  flex-shrink: 0;
  justify-content: space-between;
`;

const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  overflow: visible;
`;

const AppMain = () => (
  <AppWrapper id="app-wrapper">
    <HeaderWrapper>
      <Header />
    </HeaderWrapper>
    <BodyWrapper>
      <Routes>
        <Route path=":ensName" element={<CreateNimiPage />} />
        <Route path="/" element={<DomainsHome />} />
      </Routes>
    </BodyWrapper>
    <Footer />
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
      <ApolloProvider client={subgraphClients[chainId as number] || defaultSubgraphClient}>
        <WalletModal />
        <Routes>
          <Route element={<Landing />} path="/" />
          <Route element={<AppMain />} path="domains/*" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </ApolloProvider>
    </SkeletonTheme>
  );
}
