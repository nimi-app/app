import { NimiThemeType } from '@nimi.io/card/types';
import { css, styled } from 'styled-components';

type ClaimPOAPButtonProps = {
  variant?: 'medium' | 'big';
  marginBottom?: string;
  onClick?: () => void;
  text?: string;
  disabled?: boolean;
  style?: any;
  nimiTheme?: NimiThemeType;
};

export function ClaimPOAPButton({
  variant = 'big',
  marginBottom,
  onClick,
  text = 'Claim POAP',
  disabled = false,
  nimiTheme,
}: ClaimPOAPButtonProps) {
  return (
    <StyledButton
      nimiTheme={nimiTheme}
      disabled={disabled}
      variant={variant}
      marginBottom={marginBottom}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
}

type StyledButtonProps = {
  variant: 'medium' | 'big';
  marginBottom?: string;
  nimiTheme?: NimiThemeType;
};

export const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  padding: 0 12px;
  line-height: 15px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  color: white;
  cursor: pointer;
  margin: 0 auto;

  &:disabled {
    opacity: 0.5;
  }

  ${({ variant }) => {
    switch (variant) {
      case 'medium':
        return css`
          width: fit-content;
          height: 36px;
          border-radius: 18px;
        `;
      case 'big':
        return css`
          width: 100%;
          height: 56px;
          border-radius: 24px;
        `;
      default:
        return '';
    }
  }}

  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}

  &:hover {
    ${({ nimiTheme }) =>
      nimiTheme === NimiThemeType.ETH_PRAGUE_2023
        ? `background: #FFF491;color:#212123;`
        : 'background:    background: linear-gradient(111.35deg, #4368eacf -25.85%, #c490ddcf 73.38%);'}
  }
  ${({ nimiTheme }) => (nimiTheme === NimiThemeType.ETH_PRAGUE_2023 ? `background: #FFF491;color:#212123;` : '')}
`;
