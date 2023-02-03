import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Heading } from '../components/Heading';
import { ENV_SUPPORTED_CHAIN_IDS } from '../constants';
import { useRainbow } from '../hooks/useRainbow';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '../theme';

export function PageLayout({
  children,
  flexContainer,
}: PropsWithChildren<{
  flexContainer?: boolean;
}>) {
  const { chainId } = useRainbow();
  const { t } = useTranslation(['common', 'landing']);
  const [isNetworkSupported, setIsNetworkSupported] = useState(false);

  useEffect(() => {
    setIsNetworkSupported(ENV_SUPPORTED_CHAIN_IDS.includes(chainId as number));
  }, [chainId]);

  if (!isNetworkSupported) {
    return (
      <Container>
        <Header />
        <ContentFlex>
          <ErrorContainer>
            <Heading>{t('error.unsupportedNetwork')}</Heading>
            <Heading type="sub" color="#000">
              Please change your network by clicking the account button on the top right.
            </Heading>
          </ErrorContainer>
        </ContentFlex>
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      {flexContainer ? <ContentFlex>{children}</ContentFlex> : <Content>{children}</Content>}
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
  width: 100%;
  min-height: calc(100vh - (${HEADER_HEIGHT} + ${FOOTER_HEIGHT}));
  flex: 1; /* to fill the remaining space */
  margin: 0 auto;
`;

const ContentFlex = styled(Content)`
  display: flex;
  flex-direction: column;
`;

const ErrorContainer = styled.div`
  width: 100%;
  text-align: center;
`;
