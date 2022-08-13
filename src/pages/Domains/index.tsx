import { useWeb3React } from '@web3-react/core';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Flex } from 'rebass';

// Queries
import { useGetDomainsQuery } from '../../generated/graphql/ens';

import { Container } from '../../components/Container';
import { Loader } from '../../components/Loader';
import { ENSNameCard } from '../../components/ENSNameCard';
import { NimiSignatureColor } from '../../theme';
import { DottedButtonBase } from '../../components/Button/styled';

import { useDomainsForUser } from '../../hooks/Bonfida/useBonfidaDomainsForUser';

import { useSolana } from '../../context/SolanaProvider';
import { ActiveNetworkState, useActiveNetwork } from '../../context/ActiveNetwork';
import { SolanaNameCard } from '../../components/ENSNameCard/SolanaNameCard';

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

function EnsDomains({ address }: DomainsProps) {
  const { data, loading } = useGetDomainsQuery({
    variables: {
      address: address.toLowerCase(),
    },
  });
  const { t } = useTranslation('nimi');

  if (loading || !data) {
    return <Loader />;
  }

  return (
    <Container>
      <DomainsHeader>Your Identities</DomainsHeader>
      {!data.account?.domains || data.account.domains.length === 0 ? (
        <BigBanner>
          {t('noEnsFound')}
          <BuyDomainLink onClick={() => window.open('https://app.ens.domains/', '_blank')?.focus()}>
            {t('buyDomain')}
          </BuyDomainLink>
        </BigBanner>
      ) : (
        <StyledDomainsWrapper>
          {data.account.domains.map(({ id, name, labelName }) => {
            return <ENSNameCard key={id} name={name || ''} labelName={labelName || ''} />;
          })}
          <AddDomain onClick={() => window.open('https://app.ens.domains/', '_blank')?.focus()}>Buy an ENS</AddDomain>
        </StyledDomainsWrapper>
      )}
    </Container>
  );
}

function SolanaDomains() {
  const { result, loading } = useDomainsForUser();

  if (loading || !result) {
    return <Loader />;
  }

  return (
    <Container>
      <DomainsHeader>Your Identities</DomainsHeader>
      {result.length === 0 ? (
        <BigBanner>
          No Bonfida domains found
          <BuyDomainLink onClick={() => window.open('https://app.ens.domains/', '_blank')?.focus()}>
            Buy Domain
          </BuyDomainLink>
        </BigBanner>
      ) : (
        <StyledDomainsWrapper>
          {result.map((item, index) => {
            return <SolanaNameCard key={index} name={item.reverse} routeData={result[index]} />;
          })}
          <AddDomain onClick={() => window.open('https://app.ens.domains/', '_blank')?.focus()}>Buy Bonfida</AddDomain>
        </StyledDomainsWrapper>
      )}
    </Container>
  );
}

/**
 * A logic wrapper around Domains components
 */
export function DomainsHome() {
  const { account, isActive } = useWeb3React();
  const { activeNetwork } = useActiveNetwork();
  const { wallet } = useSolana();

  if (activeNetwork === ActiveNetworkState.ETHEREUM && account && isActive) {
    return <EnsDomains address={account} />;
  }
  if (activeNetwork === ActiveNetworkState.SOLANA && wallet) {
    return <SolanaDomains />;
  }
  // Redirect to home page if no wallet is connected
  return <Navigate to="/" />;
}
