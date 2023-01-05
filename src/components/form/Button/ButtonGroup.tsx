import { NIMI_CARDS_WIDTH } from '@nimi.io/card/constants';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const StyledButton = styled(motion.button)<{ disabled: boolean }>`
  display: flex;
  height: 42px;
  border-color: transparent;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  padding: 12px 16px;
  width: fit-content;
  gap: 8.7px;
  opacity: ${({ disabled }) => disabled && '0.5'};
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
interface ButtonGroupProps {
  id?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonGroup = ({ id, children, onClick, disabled = false }: PropsWithChildren<ButtonGroupProps>) => {
  return (
    <StyledButton
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      id={id}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};
