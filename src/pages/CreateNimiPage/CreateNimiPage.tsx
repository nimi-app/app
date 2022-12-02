import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SUPPORTED_CHAIN_IDS } from '../../constants';
import { CreateNimiContainer } from '../../components/CreateNimi/CreateNimiContainer';
import { useTranslation } from 'react-i18next';
import { Chain } from '@rainbow-me/rainbowkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
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
  const rainbow = useRainbow();
  const isConnected = rainbow.status === 'connected';
  const chainId = rainbow.data?.chain?.id;
  const chains = rainbow.chains as Chain[];
  const { ensName } = useParams();

  if (isConnected !== true) {
    navigate('/');
    return (
      <WagmiConfig client={rainbow}>
        <RainbowKitProvider chains={chains}>
          <Container />
        </RainbowKitProvider>
      </WagmiConfig>
    );
  }
  if (SUPPORTED_CHAIN_IDS.includes(chainId as number) === false) {
    return (
      <WagmiConfig client={rainbow}>
        <RainbowKitProvider chains={chains}>
          <Container>
            <ErrorContainer>{t('error.unsupportedNetwork')}</ErrorContainer>
            <NormalText>Please change your network by clicking the account button on the top right.</NormalText>
          </Container>
        </RainbowKitProvider>
      </WagmiConfig>
    );
  }
  return <CreateNimiContainer ensName={ensName as string} />;
}
