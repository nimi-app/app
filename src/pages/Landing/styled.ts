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
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 62px;
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
  ${NimiSignatureColor};
  font-size: 72px;
  align-items: center;
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
