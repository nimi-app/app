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
import { loadFathom } from '../utils';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.mainBackgoround};
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
  justify-content: start;
  width: 100%;
  margin-top: 24px;
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
          <Route element={<Landing />} path="/" />
          <Route element={<AppMain />} path="domains/*" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </ApolloProvider>
    </SkeletonTheme>
  );
}
