import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../../assets/svg/arrow.svg';

interface PaginationProps {
  page: number;
  setPage: any;
  hasNextPage: boolean;
}

export function Pagination({ page, setPage, hasNextPage }: PaginationProps) {
  console.log('page', page);
  return (
    <PaginationWrapper>
      <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
        <ArrowBack />
      </button>

      <PageNumber hide={page === 0}>{page}</PageNumber>
      <PageNumber>{page + 1}</PageNumber>
      <PageNumber hide={!hasNextPage}>{page + 2}</PageNumber>
      <ArrowNext onClick={() => setPage((prev) => prev + 1)} />
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const ArrowBack = styled(Arrow)<{ disabled?: boolean }>`
  transform: scaleX(-1);
  /* pointer-events: none;
  path {
    pointer-events: auto;
  }

  cursor: pointer; */
`;

const ArrowNext = styled(Arrow)<{ disabled?: boolean }>`
  cursor: pointer;
  pointer-events: none;
  path {
    pointer-events: auto;
  }
`;

const PageNumber = styled.div<{ hide?: boolean }>`
  ${({ hide }) => hide && 'display:none'}
`;
