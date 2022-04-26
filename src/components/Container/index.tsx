import styled from 'styled-components';
import { MEDIA_WIDTHS } from '../../theme';

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${MEDIA_WIDTHS.upToMedium}px;
  padding-left: ${({ theme }) => theme.grids.md}px;
  padding-right: ${({ theme }) => theme.grids.md}px;
  width: 100%;
`;
