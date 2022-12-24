import { Container } from '@nimi.io/card';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { CreateNimiContainer } from '../../components/CreateNimi/CreateNimiContainer';
import { ENV_SUPPORTED_CHAIN_IDS } from '../../constants';
import { useRainbow } from '../../hooks/useRainbow';
import { AppWrapper } from '../../modules/app-wrapper';
import { NimiSignatureColor } from '../../theme';

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

export function CreateNimiPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { chainId, isConnected } = useRainbow();
  const { ensName } = useParams();
  if (isConnected !== true) {
    navigate('/');
    return <Container />;
  }

  if (ENV_SUPPORTED_CHAIN_IDS.includes(chainId as number) === false) {
    return (
      <AppWrapper>
        <Container>
          <ErrorContainer>{t('error.unsupportedNetwork')}</ErrorContainer>
          <NormalText>Please change your network by clicking the account button on the top right.</NormalText>
        </Container>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <CreateNimiContainer ensName={ensName as string} />{' '}
    </AppWrapper>
  );
}
