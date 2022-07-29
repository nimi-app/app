import styled from 'styled-components';
import { MEDIA_WIDTHS } from '../../../../theme';
import { Button } from '../../../Button';

export const ImportButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  margin-top: 28px;
  gap: 16px;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    flex-wrap: wrap;

    justify-content: center;
  }
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
