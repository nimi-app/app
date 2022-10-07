import styled from 'styled-components';

type TemplatePickerButtonProps = {
  themeImage: string;
  themeName: string;
  onClick: () => void;
};

export function TemplatePickerButton({ themeImage, themeName, onClick }: TemplatePickerButtonProps) {
  return (
    <Container onClick={onClick}>
      <ThemeImage src={themeImage} />
      <ThemeName src={themeName} />
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
