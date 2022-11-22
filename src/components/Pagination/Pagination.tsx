import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../../assets/svg/arrow.svg';

interface PaginationProps {
  page: number;
  setPage: any;
  hasNextPage: boolean;
  loading: boolean;
}

export function Pagination({ page, setPage, hasNextPage, loading }: PaginationProps) {
  console.log('page', page);
  console.log('hasNextPage', hasNextPage);
  return (
    <PaginationWrapper>
      <ArrowButton disabled={page === 0} onClick={() => setPage((prev) => prev - 1)}>
        <ArrowBack />
      </ArrowButton>

      <PageNumber hide={page === 0}>{page}</PageNumber>
      <PageNumber isCurrentPage={true}>{page + 1}</PageNumber>
      <PageNumber hide={!hasNextPage || loading}>{page + 2}</PageNumber>
      <ArrowButton disabled={!hasNextPage || loading}>
        <ArrowNext onClick={() => setPage((prev) => prev + 1)} />
      </ArrowButton>
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 36px;
`;

const ArrowButton = styled.button`
  border: none;
  background: none;
  ${({ disabled }) => (disabled ? 'pointer-events:none' : 'cursor:pointer')};
`;
const ArrowBack = styled(Arrow)`
  transform: scaleX(-1);
`;

const ArrowNext = styled(Arrow)<{ disabled?: boolean }>`
  ${({ disabled }) => (disabled ? 'pointer-events:none' : 'cursor:pointer')};
`;

const PageNumber = styled.div<{ hide?: boolean; isCurrentPage?: boolean }>`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${({ isCurrentPage }) => (isCurrentPage ? '#7A7696' : '#CCC7C7')};
  ${({ hide }) => hide && 'display:none'}
`;
