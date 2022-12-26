import styled from 'styled-components';

import { MEDIA_WIDTHS, NimiSignatureColor } from '../../theme';

export const HeaderWrapper = styled.div`
  display: flex;
  padding: 27px 90px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 27px 10px;
  }
`;
export const AccountAndLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: none;
  }
`;
export const NavOption = styled.div`
  ${NimiSignatureColor};
  font-size: 18px;
  font-weight: 600;
`;
