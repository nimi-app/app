import { styled } from 'styled-components';

export const StyledGridList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export const StyledFlexList = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;
