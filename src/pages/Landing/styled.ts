import styled from 'styled-components';

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
