import styled from 'styled-components';

import { ReactComponent as Twitter } from '../../assets/svg/twitter-logo.svg';
import { Container } from '../Container';

export const FooterMain = styled.footer`
  display: flex;
  width: 100%;
  background: transparent;
  min-height: 60px;
  flex-shrink: 0;
`;

export const FooterWrapper = styled(Container)`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  flex-direction: row;

  & > * {
    width: 100%;
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

  & svg {
    fill: #1f3e4f;
  }
`;
export const TwitterLogo = styled(Twitter)`
  path {
    fill: #56ccf2;
  }
`;
