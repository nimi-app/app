import { NIMI_CARDS_WIDTH } from 'nimi-card';
import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  height: 42px;
  border-color: transparent;
  cursor: pointer;
  padding: 12px 16px;
  width: fit-content;
  gap: 8.7px;
  align-items: center;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), #ffffff;
  box-shadow: 0px 5px 18px rgba(156, 149, 233, 0.2);
  border-radius: 20px;
  color: ${({ theme }) => theme['shadow1']};
  @media (max-width: ${NIMI_CARDS_WIDTH}px) {
    font-size: 14px;
    gap: none;
  }
`;

export const ButtonGroup = ({ id, children, onClick }) => {
  return (
    <StyledButton id={id} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
