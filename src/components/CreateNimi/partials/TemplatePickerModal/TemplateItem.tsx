import styled from 'styled-components';
import { MEDIA_WIDTHS } from '../../../../theme';
import { Theme } from '../../../../types';

type TemplateItemProps = {
  theme: Theme;
  onClick: () => void;
  noMargin?: boolean;
};

export function TemplateItem({ theme, onClick, noMargin }: TemplateItemProps) {
  return (
    <Container onClick={onClick} noMargin={noMargin}>
      <ThemeDataContainer>
        <ThemeData>
          <ThemeImageLogo src={theme.logoImage} />
          <ThemeNameLogo src={theme.logoText} />
        </ThemeData>
      </ThemeDataContainer>
      <ThemePreview src={theme.preview} />
    </Container>
  );
}

const Container = styled.div<{ noMargin?: boolean }>`
  width: 100%;
  height: 230px;
  position: relative;
  border-radius: 14px;
  box-shadow: 0px 14.4118px 38.4314px -9.45772px rgba(44, 43, 102, 0.14);
  cursor: pointer;
  ${({ noMargin }) => !noMargin && 'margin-bottom: 14px;'}
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
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin: 0 auto;
  }
`;

const ThemeImageLogo = styled.img`
  width: 100%;
  border-radius: 50%;
  box-shadow: 0px 49.5867px 74.3801px -13.7741px rgba(44, 43, 102, 0.15);
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
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: none;
  }
`;
