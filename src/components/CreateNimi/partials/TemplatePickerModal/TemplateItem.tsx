import styled from 'styled-components';

import NimiLogo from '../../../../assets/svg/nimi-logo-no-text.svg';

export function TemplateItem() {
  return (
    <Container>
      <ThemeDataContainer>
        <ThemeData>
          <Logo src={NimiLogo} />
        </ThemeData>
      </ThemeDataContainer>
      <ThemeLook />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 230px;
  position: relative;
  border-radius: 14px;
  box-shadow: 0px 14.4118px 38.4314px -9.45772px rgba(44, 43, 102, 0.14);
  margin-bottom: 14px;
`;

const ThemeDataContainer = styled.div`
  width: 100%;
  height: 230px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 14px;
  border: 5px solid white;
  background-color: #f0f3fb;
`;

const ThemeData = styled.div`
  width: 126px;
  height: 100%;
  margin-left: 122px;
`;

const Logo = styled.img`
  width: 126px;
  height: 126px;
  border-radius: 50%;
  margin-top: 29px;
`;

const ThemeLook = styled.div`
  width: 212px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 14px;
  border: 5px solid white;
  box-shadow: 0px 14.4118px 38.4314px -9.45772px rgba(44, 43, 102, 0.14);
`;
