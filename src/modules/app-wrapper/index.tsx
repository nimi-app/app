import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { FOOTER_HEIGHT, HEADER_HEIGHT, MEDIA_WIDTHS } from '../../theme';

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
  max-width: ${MEDIA_WIDTHS.upToMedium}px;
  width: 100%;
  min-height: calc(100vh - (${HEADER_HEIGHT} + ${FOOTER_HEIGHT}));
  padding: 0 20px;
  margin: 0 auto;
`;
