import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { ENV_SUPPORTED_CHAIN_IDS } from '../../constants';
import { useRainbow } from '../../hooks/useRainbow';
import { FOOTER_HEIGHT, HEADER_HEIGHT, MEDIA_WIDTHS, NimiSignatureColor } from '../../theme';

export function AppWrapper() {
  const { chainId } = useRainbow();
  const { t } = useTranslation(['common', 'landing']);

  return (
    <Container id="app-wrapper">
      <Header />
      <Content>
        {!ENV_SUPPORTED_CHAIN_IDS.includes(chainId as number) ? (
          <Container>
            <ErrorContainer>{t('error.unsupportedNetwork')}</ErrorContainer>
            <NormalText>Please change your network by clicking the account button on the top right.</NormalText>
          </Container>
        ) : (
          <Outlet />
        )}
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
  padding: 40px 20px 0;
  margin: 0 auto;
`;

const ErrorContainer = styled.div`
  ${NimiSignatureColor};
  font-weight: 800;
  font-size: 36px;
  line-height: 39px;
  margin-bottom: 36px;
`;

const NormalText = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  margin-top: 17px;
  cursor: pointer;
`;
