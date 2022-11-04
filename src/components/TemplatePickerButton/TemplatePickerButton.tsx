import styled from 'styled-components';

import { Theme } from '../../types';

type TemplatePickerButtonProps = {
  selectedTheme: Theme;
  onClick: () => void;
};

export function TemplatePickerButton({ selectedTheme, onClick }: TemplatePickerButtonProps) {
  return (
    <Container onClick={onClick}>
      <ThemeImage src={selectedTheme.logoImage} />
      <ThemeName src={selectedTheme.logoText} />
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
  align-self: center;
`;

const ThemeImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
`;

const ThemeName = styled.img``;
