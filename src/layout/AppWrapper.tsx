import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Heading } from '../components/Heading';
import { ENV_SUPPORTED_CHAIN_IDS } from '../constants';
import { useRainbow } from '../hooks/useRainbow';
import { FOOTER_HEIGHT, HEADER_HEIGHT, MEDIA_WIDTHS } from '../theme';

export function PageLayout({ children }: PropsWithChildren) {
  const { chainId } = useRainbow();
  const { t } = useTranslation(['common', 'landing']);
  const [isNetworkSupported, setIsNetworkSupported] = useState(false);

  useEffect(() => {
    setIsNetworkSupported(ENV_SUPPORTED_CHAIN_IDS.includes(chainId as number));
  }, [chainId]);

  return (
    <Container>
      <Header />
      <Content>
        {isNetworkSupported ? (
          children
        ) : (
          <ErrorContainer>
            <Heading>{t('error.unsupportedNetwork')}</Heading>
            <Heading type="sub" color="#000">
              Please change your network by clicking the account button on the top right.
            </Heading>
          </ErrorContainer>
        )}
      </Content>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 100%;
  text-align: center;
`;
