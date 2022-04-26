import styled from 'styled-components';
import { MEDIA_WIDTHS } from '../../theme';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 62px;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #fff;
  min-height: 60px;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  font-style: normal;
  height: 800px;
  margin-top: 160px;
  text-align: center;
`;

export const HeroText = styled.div`
  font-size: 72px;
  align-items: center;
  background: linear-gradient(154.32deg, #4368ea 0.48%, #c490dd 85.86%);
  -webkit-background-clip: text;
  background-clip: text;
  text-fill-color: transparent;
  justify-content: start;
  > * {
    -webkit-text-fill-color: transparent;
  }
`;

export const HeroLead = styled.div`
  font-weight: 400;
`;

export const HeroSub = styled.div`
  font-weight: 600;
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
