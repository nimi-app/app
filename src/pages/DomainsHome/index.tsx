import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import { DottedBorder } from '../../components/Button/styled';
import { DomainItem } from '../../components/DomainItem';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination/';
import { useGetENSDomainsByAddress } from '../../hooks/useGetENSDomainsByAddress';
import { useRainbow } from '../../hooks/useRainbow';
import { ControlBar } from './ControlBar';
import { NoENSBanner } from './NoENSBanner';

// TODO: ADD ENSDomain AS MODEL

// type ENSDomain = {
//   id: string;
//   labelName: string;
//   labelhash: string;
//   name: string;
//   parent: {
//     name: string;
//   };
// };

export function DomainsHome() {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);

  const { account } = useRainbow();

  const { data: domainList, loading, hasNextPage } = useGetENSDomainsByAddress(account as string, page, searchText);

  const openENSWebsiteHandler = () => window.open('https://app.ens.domains/', '_blank')?.focus();
  const searchTextChangedHandler = (event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

  return (
    <Container>
      <ControlBar value={searchText} searchTextChangedHandler={searchTextChangedHandler} />
      {(() => {
        if (loading) return <Loader />;
        if (domainList?.length === 0) return <NoENSBanner openENSWebsiteHandler={openENSWebsiteHandler} />;

        return (
          <DomainsContainer>
            {domainList?.map((domain) => (
              <DomainItem key={domain.id} domain={domain} />
            ))}
            <AddDomain onClick={openENSWebsiteHandler}>Buy an ENS</AddDomain>
          </DomainsContainer>
        );
      })()}
      <Pagination loading={loading} page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const DomainsContainer = styled.div`
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
