import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as SearchIcon } from '../../assets/svg/search-icon.svg';
import { DottedButtonBase } from '../../components/Button/styled';
import { Container } from '../../components/Container';
import { ENSCardContainer } from '../../components/ENSCard/ENSCardContainer';
import { InputFieldWithIcon } from '../../components/Input';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination/';
import { ENV_SUPPORTED_CHAIN_IDS } from '../../constants';
import { useGetENSDomainsByAddress } from '../../hooks/useGetENSDomainsByAddress';
import { useRainbow } from '../../hooks/useRainbow';
import { AppWrapper } from '../../modules/app-wrapper';
import { NimiSignatureColor } from '../../theme';

const StyledDomainsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: start;
`;
const ErrorContainer = styled.div`
  ${NimiSignatureColor};
  font-weight: 800;
  font-size: 36px;
  line-height: 39px;
  margin-bottom: 36px;
`;
const DomainsHeader = styled.div`
  ${NimiSignatureColor};
  font-weight: 800;
  font-size: 36px;
  line-height: 39px;
  margin-bottom: 36px;
  width: fit-content;
  display: flex;
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

const NormalText = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  margin-top: 17px;
  cursor: pointer;
`;

interface DomainsProps {
  address: string;
}

function Domains({ address }: DomainsProps) {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);

  const { t } = useTranslation('nimi');

  const { data: domainList, loading, hasNextPage } = useGetENSDomainsByAddress(address, page, searchText);

  return (
    <AppWrapper>
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
    </AppWrapper>
  );
}

/**
 * A logic wrapper around Domains components
 */
export function DomainsHome() {
  const { chainId, account, isConnected } = useRainbow();
  const { t } = useTranslation(['common', 'landing']);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected !== true) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  if (isConnected !== true) {
    return <Container />;
  }
  if (ENV_SUPPORTED_CHAIN_IDS.includes(chainId as number) === false) {
    return (
      <AppWrapper>
        <Container>
          <ErrorContainer>{t('error.unsupportedNetwork')}</ErrorContainer>
          <NormalText>Please change your network by clicking the account button on the top right.</NormalText>
        </Container>
      </AppWrapper>
    );
  }
  return <Domains address={account as string} />;
}
