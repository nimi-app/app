import { SkeletonTheme } from 'react-loading-skeleton';
import styled, { useTheme } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Suspense } from 'react';

import { defaultClient as defaultSubgraphClient, clients as subgraphClients } from '../apollo/client';
import { useActiveWeb3React } from '../hooks/useWeb3';
import { Web3ReactManager } from '../components/Web3ReactManager';
import { Header } from '../components/Header';

import { NotFound } from './NotFound';
import { Landing } from './Landing';
import { Domains } from './Domains';
import { Footer } from '../components/Footer';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 172px);
  width: 100%;
  padding-top: 60px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  overflow: visible;
  z-index: 10;
  padding-left: 16px;
  padding-right: 16px;
  z-index: 1;
`;

const AppMain = () => (
  <AppWrapper id="app-wrapper">
    <HeaderWrapper>
      <Header />
    </HeaderWrapper>
    <BodyWrapper>
      <Web3ReactManager>
        <Routes>
          <Route path=":name" element={<Domains />} />
          <Route path="/" element={<Domains />} />
        </Routes>
      </Web3ReactManager>
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
