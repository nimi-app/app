import styled from 'styled-components';

const backgroundAlert = (childOutside) =>
  childOutside === 'left'
    ? 'background: linear-gradient(90deg, rgba(255, 0, 0, 0.2) -1.26%, rgba(255, 0, 0, 0) 37.05%), #F1F2F5;'
    : childOutside === 'right'
    ? 'background: linear-gradient(270deg, rgba(255, 0, 0, 0.2) -1.26%, rgba(255, 0, 0, 0) 37.05%), #F1F2F5;'
    : '';

export const PresentedPOAPsContainer = styled.div<{ childOutside?: 'left' | 'right' | 'none' }>`
  position: relative;
  padding: 22px;
  background-color: #f1f2f5;
  border-radius: 76px;

  ${({ childOutside }) => backgroundAlert(childOutside)}
`;
