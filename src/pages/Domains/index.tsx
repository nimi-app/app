import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from 'rebass';

// Queries
import { useGetDomainsQuery } from '../../generated/graphql';

import { ENSNameCard } from '../../components/ENSNameCard/ENSNameCard';
import { Container } from '../../components/Container';
import { Loader } from '../../components/Loader';

const StyledDomainsWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 19px;
  justify-content: center;
`;

interface DomainsProps {
  address: string;
}

function Domains({ address }: DomainsProps) {
  const { t } = useTranslation();

  const { data, loading } = useGetDomainsQuery({
    variables: {
      address: address.toLowerCase(),
    },
  });

  if (loading || !data) {
    return <Loader />;
  }

  // User has no domains
  if (!data.account?.domains || data.account.domains.length === 0) {
    return <h2>{t('noDomains')}</h2>;
  }

  return (
    <Container>
      <StyledDomainsWrapper>
        {data.account.domains.map(({ id, name, labelName }) => {
          return <ENSNameCard key={id} name={name || ''} labelName={labelName || ''} />;
        })}
      </StyledDomainsWrapper>
    </Container>
  );
}

/**
 * A logic wrapper around Domains components
 */
export function DomainsHome() {
  const { account, isActive } = useWeb3React();

  if (account && isActive) {
    return <Domains address={account} />;
  }

  // Redirect to home page if no wallet is connected
  return <Navigate to="/" />;
}
