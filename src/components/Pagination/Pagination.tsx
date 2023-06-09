import createDebugger from 'debug';
import { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';

import { ReactComponent as Arrow } from '../../assets/svg/arrow.svg';

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasNextPage?: boolean;
  loading: boolean;
}

const debug = createDebugger('components:Pagination');

export function Pagination({ page, setPage, hasNextPage, loading }: PaginationProps) {
  debug({
    page,
    hasNextPage,
  });

  const goToNextPage = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <PaginationWrapper>
      <ArrowButton disabled={page === 1} onClick={goToPreviousPage}>
        <ArrowBack />
      </ArrowButton>
      <PageNumber onClick={goToPreviousPage} $hide={page === 1}>
        {page - 1}
      </PageNumber>
      <PageNumber $isCurrentPage={true}>{page}</PageNumber>
      <PageNumber onClick={goToNextPage} $hide={!hasNextPage || loading}>
        {page + 1}
      </PageNumber>
      <ArrowButton disabled={!hasNextPage || loading}>
        <ArrowNext onClick={goToNextPage} />
      </ArrowButton>
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 36px;
`;

const ArrowButton = styled.button`
  border: none;
  background: none;
  padding: 0 10px;
  ${({ disabled }) => (disabled ? 'pointer-events:none' : 'cursor:pointer')};
`;
const ArrowBack = styled(Arrow)`
  transform: scaleX(-1);
`;

const ArrowNext = styled(Arrow)<{ disabled?: boolean }>`
  ${({ disabled }) => (disabled ? 'pointer-events:none' : 'cursor:pointer')};
`;

const PageNumber = styled.div<{ $hide?: boolean; $isCurrentPage?: boolean }>(
  ({ $isCurrentPage, $hide }) => `
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  padding: 0 10px;
  cursor: pointer;
  color: ${$isCurrentPage ? '#7A7696' : '#CCC7C7'};
  ${$hide === true && 'display:none'}
`
);
