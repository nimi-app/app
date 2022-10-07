import styled from 'styled-components';

import NimiLogo from '../../../../assets/svg/nimi-logo-no-text.svg';
import NimiOG from '../../../../assets/svg/nimi-og.svg';
import NimiOGPreview from '../../../../assets/images/nimi-og.png';
import DevconLogoText from '../../../../assets/svg/devcon-text.png';

type TemplateItemProps = {
  themeImageLogo?: string;
  themeNameLogo?: string;
};

export function TemplateItem({ themeImageLogo, themeNameLogo }: TemplateItemProps) {
  return (
    <Container>
      <ThemeDataContainer>
        <ThemeData>
          <ThemeImageLogo src={themeImageLogo} />
          <ThemeNameLogo src={themeNameLogo} />
        </ThemeData>
      </ThemeDataContainer>
      <ThemePreview src={NimiOGPreview} />
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
  border-radius: 14px;
  border: 5px solid white;
  background-color: #f0f3fb;
`;

const ThemeData = styled.div`
  width: 126px;
  height: 100%;
  margin-left: 122px;
`;

const ThemeImageLogo = styled.img`
  width: 100%;
  border-radius: 50%;
  margin: 29px 0 12px;
`;

const ThemeNameLogo = styled.img`
  display: block;
  margin: 0 auto;
`;

const ThemePreview = styled.img`
  width: 212px;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 14px;
  border: 5px solid white;
  box-shadow: 0px 14.4118px 38.4314px -9.45772px rgba(44, 43, 102, 0.14);
`;
