import styled from 'styled-components';
import { NimiSignatureColor } from '../../theme';

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
  position: absolute;
  margin-top: 60px;
  top: 0;
  -webkit-box-pack: center;
  justify-content: center;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  font-style: normal;

  text-align: center;
`;

export const HeroText = styled.div`
  ${NimiSignatureColor};
  font-size: 72px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size:42px;
  `};
  align-items: center;
  margin-bottom: 20px;
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
