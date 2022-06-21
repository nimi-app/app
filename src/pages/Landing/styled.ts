import styled from 'styled-components';
import backgroundImageUrl from '../../assets/images/nimi-header-background.png';
import { NimiSignatureColor } from '../../theme';
import backgroungImageUrl from '../../assets/images/nimi-header-background.png';

export const PageWrapper = styled.div`
  display: flex;
  background-image: url('${backgroungImageUrl}');
  background-position: center;
  background-size: cover;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-image: url('${backgroundImageUrl}');
  background-position: center;
  background-size: cover;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;

  margin-top: 60px;
  flex-grow: 0;
  -webkit-box-pack: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-style: normal;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
`;

export const HeroText = styled.div`
  ${NimiSignatureColor};
  font-size: 72px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size:42px;
  `};
  align-items: center;
  margin-bottom: 32px;
  justify-content: start;
  > * {
    -webkit-text-fill-color: transparent;
  }
`;

export const HeroLead = styled.div`
  font-weight: 400;
  line-height: 93.06px;
`;

export const HeroSub = styled.div`
  font-weight: 600;
`;
export const HeaderEyebrow = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 117.7%;
  margin-bottom: 16px;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: #556de7;
`;
