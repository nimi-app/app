import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from 'rebass';

// Queries
import { useGetDomainsQuery } from '../../generated/graphql';

import { Container } from '../../components/Container';
import { Loader } from '../../components/Loader';
import { ENSNameCard } from '../../components/ENSNameCard';
import { NimiSignatureColor } from '../../theme';
import { StyledDomainName } from '../../components/ENSNameCard/styleds';

const StyledDomainsWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 18px;
  justify-content: center;
`;
const DomainsHeader = styled.div`
  ${NimiSignatureColor};
  font-weight: 800;
  font-size: 36px;
  line-height: 39px;
  margin-bottom: 36px;
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
    return <StyledDomainName>{t('noDomains')}</StyledDomainName>;
  }

  console.log(data);
  return (
    <Container>
      <DomainsHeader>Your Identities</DomainsHeader>
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
