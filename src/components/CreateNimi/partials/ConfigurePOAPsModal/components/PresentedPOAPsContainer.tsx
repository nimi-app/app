import styled from 'styled-components';

export const PresentedPOAPsContainer = styled.div<{ childOutside?: boolean }>`
  padding: 22px;
  background-color: #f1f2f5;
  border-radius: 76px;

  ${({ childOutside }) => childOutside && 'background-color: red;'}
`;
