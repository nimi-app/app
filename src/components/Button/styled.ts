import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * Base Button frame
 */
export const StyledBase = styled.div`
  position: relative;
  overflow: hidden;

  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  border-radius: 30px;
  padding: 10px 24px;

  font-family: inherit;
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.white};

  user-select: none;
  appearance: none;
  cursor: pointer;
  outline: none;
  border: none;

  /** Animations */
  animation-timing-function: ease-out;
  animation-duration: 300ms;

  /** States */
  &:hover {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)),
      linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  }

  &:active,
  &:focus {
    background: linear-gradient(111.35deg, #0d42ff -25.85%, #b83af3 73.38%);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.purple5};
    cursor: not-allowed;
    box-shadow: none;
    outline: none;
  }
`;

export const StyledLink = styled(Link)`
  display: inline-block;
`;

/**
 * Inner component for the button.
 */
export const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;
