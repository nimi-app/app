import { useWeb3React } from '@web3-react/core';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Flex } from 'rebass';

import { Container } from '../../components/Container';
import { Loader } from '../../components/Loader';

import { NimiSignatureColor } from '../../theme';
import { DottedButtonBase } from '../../components/Button/styled';
import { useGetENSDomainsByAddress } from '../../hooks/useGetENSDomainsByAddress';
import { ENSCardContainer } from '../../components/ENSCard/ENSCardContainer';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const StyledDomainsWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 18px;
  justify-content: start;
`;
const DomainsHeader = styled.div`
  ${NimiSignatureColor};
  font-weight: 800;
  font-size: 36px;
  line-height: 39px;
  margin-bottom: 36px;
`;
const AddDomain = styled(DottedButtonBase)`
  width: 308px;
  border-radius: 16px;
  height: 146px;
  font-weight: 400;
  letter-spacing: -0.02em;
  font-size: 24px;
`;
const BigBanner = styled(DottedButtonBase)`
  border-radius: 16px;
  font-weight: 400;
  font-size: 24px;
  width: 100%;
  padding: 80px 0;
  letter-spacing: -0.02em;
`;

const BuyDomainLink = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  text-decoration-line: underline;
  text-decoration-color: #9280e3;
  margin-top: 17px;
  cursor: pointer;
`;

interface DomainsProps {
  address: string;
}

function Domains({ address }: DomainsProps) {
  const { data: domainList, loading } = useGetENSDomainsByAddress(address);

  const { t } = useTranslation('nimi');

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <DomainsHeader>Your Identities</DomainsHeader>
      {domainList?.length === 0 ? (
        <BigBanner>
          {t('noEnsFound')}
          <BuyDomainLink onClick={() => window.open('https://app.ens.domains/', '_blank')?.focus()}>
            {t('buyDomain')}
          </BuyDomainLink>
        </BigBanner>
      ) : (
        <StyledDomainsWrapper>
          {domainList?.map((domain) => (
            <ENSCardContainer key={domain.name} domain={domain} />
          ))}
          <AddDomain onClick={() => window.open('https://app.ens.domains/', '_blank')?.focus()}>Buy an ENS</AddDomain>
        </StyledDomainsWrapper>
      )}
    </Container>
  );
}

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Nimi',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

/**
 * A logic wrapper around Domains components
 */
export function DomainsHome() {
  if (wagmiClient.status === 'connected') {
    return <Domains address={wagmiClient.data?.account as string} />;
  }

  // Redirect to home page if no wallet is connected
  return <Navigate to="/" />;
}
