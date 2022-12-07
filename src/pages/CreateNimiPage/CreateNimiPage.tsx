import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ENV_SUPPORTED_CHAIN_IDS } from '../../constants';
import { CreateNimiContainer } from '../../components/CreateNimi/CreateNimiContainer';
import { useTranslation } from 'react-i18next';
import { Container } from '@nimi.io/card';
import { NimiSignatureColor } from '../../theme';
import { useRainbow } from '../../hooks/useRainbow';

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
      <Container>
        <ErrorContainer>{t('error.unsupportedNetwork')}</ErrorContainer>
        <NormalText>Please change your network by clicking the account button on the top right.</NormalText>
      </Container>
    );
  }
  return <CreateNimiContainer ensName={ensName as string} />;
}
