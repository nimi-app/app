import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

export function AppWrapper() {
  return (
    <Container id="app-wrapper">
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.mainBackgoround};
  overflow: hidden;
`;

const Content = styled.main`
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
