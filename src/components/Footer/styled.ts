import styled from 'styled-components';

import { ReactComponent as Twitter } from 'assets/svg/twitter-logo.svg';
import { MEDIA_WIDTHS } from 'theme';

export const FooterMain = styled.footer`
  display: flex;
  width: 100%;
  background: transparent;
  min-height: 60px;
  flex-shrink: 0;
  margin-top: 60px;
`;

export const FooterWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  flex-direction: row;
  text-align: center;

  & > * {
    width: 100%;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const FooterNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: center;
  `};
  & svg {
    fill: #1f3e4f;
  }
`;
export const TwitterLogo = styled(Twitter)`
  path {
    fill: #56ccf2;
  }
`;
