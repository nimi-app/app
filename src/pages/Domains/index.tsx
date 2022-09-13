import { useWeb3React } from '@web3-react/core';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Flex } from 'rebass';

import { Container } from '../../components/Container';
import { Loader } from '../../components/Loader';

import { NimiSignatureColor } from '../../theme';
import { DottedButtonBase } from '../../components/Button/styled';
import { useDomainsData } from '../../hooks/useDomainsData';
import { BasicENSCard } from '../../components/ENSCard/BasicENSCard';
import { PopulatedENSCard } from '../../components/ENSCard/PopulatedENSCard';

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
  const { emptyDomainArray, domainArray, loading } = useDomainsData(address);

  const { t } = useTranslation('nimi');

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <DomainsHeader>Your Identities</DomainsHeader>
      {!emptyDomainArray.length || !domainArray.length ? (
        <BigBanner>
          {t('noEnsFound')}
          <BuyDomainLink onClick={() => window.open('https://app.ens.domains/', '_blank')?.focus()}>
            {t('buyDomain')}
          </BuyDomainLink>
        </BigBanner>
      ) : (
        <StyledDomainsWrapper>
          {domainArray.length && (
            <StyledDomainsWrapper>
              {domainArray.map((item, index) => {
                return <PopulatedENSCard data={item.data} key={index} />;
              })}
            </StyledDomainsWrapper>
          )}
          {emptyDomainArray.length &&
            emptyDomainArray.map(({ id, name, labelName }) => {
              return <BasicENSCard key={id} name={name || ''} labelName={labelName || ''} />;
            })}
          <AddDomain onClick={() => window.open('https://app.ens.domains/', '_blank')?.focus()}>Buy an ENS</AddDomain>
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

  if (account && isActive) {
    return <Domains address={account} />;
  }

  // Redirect to home page if no wallet is connected
  return <Navigate to="/" />;
}
