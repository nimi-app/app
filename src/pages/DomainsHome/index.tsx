import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { ReactComponent as SearchIcon } from '../../assets/svg/search-icon.svg';
import { DottedBorder } from '../../components/Button/styled';
import { ENSCardContainer } from '../../components/ENSCard/ENSCardContainer';
import { Heading } from '../../components/Heading';
import { InputFieldWithIcon } from '../../components/Input';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination/';
import { useGetENSDomainsByAddress } from '../../hooks/useGetENSDomainsByAddress';
import { useRainbow } from '../../hooks/useRainbow';

export function DomainsHome() {
  const { account } = useRainbow();

  return <Domains address={account as string} />;
}

interface DomainsProps {
  address: string;
}

function Domains({ address }: DomainsProps) {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);

  const { t } = useTranslation('nimi');

  const { data: domainList, loading, hasNextPage } = useGetENSDomainsByAddress(address, page, searchText);

  return (
    <Container>
      <TopSection>
        <Heading>Your Identities</Heading>
        <StyledInput
          id="domain-seach"
          isSimple={true}
          inputLogo={SearchIcon}
          placeholder="Search"
          content={searchText}
          onChange={({ target }) => setSearchText(target.value)}
          style={{ maxWidth: '200px', background: 'none' }}
          isInvalidInput={false}
        />
      </TopSection>

      {loading ? (
        <Loader />
      ) : (
        <>
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
              <AddDomain onClick={() => window.open('https://app.ens.domains/', '_blank')?.focus()}>
                Buy an ENS
              </AddDomain>
            </StyledDomainsWrapper>
          )}
        </>
      )}
      <Pagination loading={loading} page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

function ENSItem() {
  return <></>;
}

function NoENSBanner() {
  return <></>;
}

const Container = styled.div`
  width: 100%;
`;

const StyledDomainsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: start;
`;

const AddDomain = styled.button`
  ${DottedBorder}
  width: 308px;
  height: 146px;
  letter-spacing: -0.02em;
`;

const BigBanner = styled.button`
  ${DottedBorder}
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

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledInput = styled(InputFieldWithIcon)`
  max-width: 200px !important;
  display: flex !important;
  align-items: flex-start;
`;
