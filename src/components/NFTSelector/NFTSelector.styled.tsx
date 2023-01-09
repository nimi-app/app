import styled from 'styled-components';

export const AssetListInnerWrapper = styled.div`
  max-height: 500px;
  width: 100%;
  overflow: auto;
  /** Layout for 2 columns */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

export const AssetListItem = styled.div`
  flex: 1 0 auto;
  margin-bottom: 10px;
`;

export const SearchBar = styled.input`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  padding: 10px;
`;
