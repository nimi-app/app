import styled from 'styled-components';
import { MEDIA_WIDTHS } from '../../theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: ${MEDIA_WIDTHS.upToMedium}px;
  width: 100%;
`;
