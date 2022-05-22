import { SkeletonTheme } from 'react-loading-skeleton';
import styled, { useTheme } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Suspense } from 'react';

import { defaultClient as defaultSubgraphClient, clients as subgraphClients } from '../apollo/client';
import { useActiveWeb3React } from '../hooks/useWeb3';
import { Header } from '../components/Header';

import { NotFound } from './NotFound';
import { Landing } from './Landing';
import { DomainsHome } from './Domains';
import { Footer } from '../components/Footer';
import { WalletModal } from '../components/WalletModal';
import { CreateNimiPage } from './CreateNimiPage';

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
