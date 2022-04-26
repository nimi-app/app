import styled from 'styled-components';

import { Button as RebassButton, BaseProps } from 'rebass';

const Base = styled.button`
  position: relative;
  padding: 10px 25px;
  text-transform: uppercase;
  text-align: center;

  color: ${({ theme }) => theme.white};

  outline: none;
  border: none;
  cursor: pointer;

  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);

  border-radius: 30px;

  user-select: none;

  font-family: inherit;
  font-weight: 600;
  font-size: 18px;

  &:disabled {
    cursor: disabled;
  }
`;

export const ButtonPrimary = styled(Base)`
  background-color: ${({ theme }) => theme.primary1};
  color: ${({ theme }) => theme.white};
  transition: background-color 0.3s ease;
  &:disabled {
    background-color: ${({ theme }) => theme.purple5};
    cursor: not-allowed;
    box-shadow: none;
    outline: none;
  }
`;
