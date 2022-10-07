import styled from 'styled-components';

import nimiOGLogoImage from '../../assets/theme/nimi-og-logo-image.png';
import nimiOGLogoText from '../../assets/theme/nimi-og-logo-text.svg';

type TemplatePickerButtonProps = {
  nimiOGLogoImage: string;
  nimiOGLogoText: string;
  onClick: () => void;
};

export function TemplatePickerButton({ nimiOGLogoImage, nimiOGLogoText, onClick }: TemplatePickerButtonProps) {
  return (
    <Container onClick={onClick}>
      <ThemeImage src={nimiOGLogoImage} />
      <ThemeName src={nimiOGLogoText} />
    </Container>
  );
}

const Container = styled.button`
  width: 170px;
  height: 150px;
  border-radius: 13px;
  border: 5px solid #fff;
  background-color: #f0f3fb;
  cursor: pointer;
`;

const ThemeImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
`;

const ThemeName = styled.img``;
