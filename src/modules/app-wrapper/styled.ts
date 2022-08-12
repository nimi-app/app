import styled from 'styled-components';

export const StyledAppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.mainBackgoround};
`;

export const StyledHeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  flex-shrink: 0;
  justify-content: space-between;
`;

export const StyledBodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  margin-top: 24px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  overflow: visible;
`;
