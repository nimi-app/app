import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

export function AppWrapper() {
  return (
    <StyledAppWrapper id="app-wrapper">
      <StyledHeaderWrapper>
        <Header />
      </StyledHeaderWrapper>
      <StyledBodyWrapper>
        <Outlet />
      </StyledBodyWrapper>
      <Footer />
    </StyledAppWrapper>
  );
}

const StyledAppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.mainBackgoround};
`;

const StyledHeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  flex-shrink: 0;
  justify-content: space-between;
`;

const StyledBodyWrapper = styled.main`
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
