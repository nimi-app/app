import { ApolloProvider } from '@apollo/client';
import { Suspense } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Route, Routes } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import { clients as subgraphClients, defaultClient as defaultSubgraphClient } from '../apollo/client';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { WalletModal } from '../components/WalletModal';
import { Web3Manager } from '../components/Web3Manager';
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

export function App() {
  const { chainId } = useActiveWeb3React();
  const theme = useTheme();

  return (
    <Suspense fallback={null}>
      <SkeletonTheme baseColor={theme.bg3} highlightColor={theme.bg2}>
        <ApolloProvider client={subgraphClients[chainId as number] || defaultSubgraphClient}>
          <Web3Manager />
          <WalletModal />
          <Routes>
            <Route element={<Landing />} path="/" />
            <Route element={<AppMain />} path="domains/*" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </ApolloProvider>
      </SkeletonTheme>
    </Suspense>
  );
}
