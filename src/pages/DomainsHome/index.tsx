import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as SearchIcon } from '../../assets/svg/search-icon.svg';
import { DottedButtonBase } from '../../components/Button/styled';
import { ENSCardContainer } from '../../components/ENSCard/ENSCardContainer';
import { InputFieldWithIcon } from '../../components/Input';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination/';
import { useGetENSDomainsByAddress } from '../../hooks/useGetENSDomainsByAddress';
import { useRainbow } from '../../hooks/useRainbow';
import { NimiSignatureColor } from '../../theme';

export function DomainsHome() {
  const { account, isConnected } = useRainbow();
  const navigate = useNavigate();

  if (isConnected !== true) {
    navigate('/');
    return <Container />;
  }

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
        <DomainsHeader>Your Identities</DomainsHeader>
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
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
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

const Container = styled.div`
  width: 100%;
`;

const StyledDomainsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: start;
`;

const DomainsHeader = styled.h1`
  display: flex;
  width: fit-content;
  line-height: 40px;
  font-size: 36px;
  font-weight: 800;
  ${NimiSignatureColor};
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

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 80px 0;
`;
