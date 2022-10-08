import styled from 'styled-components';
import { Button } from '../../../Button';

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImportButtonsWrapper = styled(ButtonsContainer)`
  flex-direction: row;
  justify-content: left;
`;

export const ImportFromTwitterButton = styled(Button)`
  background: #56ccf2;
  color: #fff;
  &:hover,
  &:focus {
    background: #56ccf2;
  }
`;

export const ImportFromLensProtocolButton = styled(Button)`
  background: #a3f428;
  color: #1a652c;
  &:hover,
  &:focus {
    background: #a3f428;
  }
`;
