import styled from 'styled-components';
import { MEDIA_WIDTHS } from '../../theme';
export const FooterMain = styled.footer`
  display: flex;

  position: absolute;
  bottom: 0;
  width: 100%;
  background: transparent;
  min-height: 60px;
`;

export const FooterWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  & > * {
    width: 100%;
  }
  @media (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: row;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FooterNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  width: 100%;
  gap: 12px;

  & svg {
    fill: #1f3e4f;
  }
`;
