import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Flex } from 'rebass';
import styled from 'styled-components';

import { DottedButtonBase } from '../../components/Button/styled';
import { Container } from '../../components/Container';
import { ENSCardContainer } from '../../components/ENSCard/ENSCardContainer';
import { Loader } from '../../components/Loader';
import { useGetENSDomainsByAddress } from '../../hooks/useGetENSDomainsByAddress';
import { NimiSignatureColor } from '../../theme';

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

export function DomainsContainer({ address }: DomainsProps) {
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

/**
 * A logic wrapper around Domains components
 */
export default function DomainsPage() {
  const { account, isActive } = useWeb3React();
  const router = useRouter();

  if (account && isActive) {
    return <DomainsContainer address={account} />;
  }

  // Redirect to home page if no account is connected
  router.push('/');
  return null;
}
