import { css, styled } from 'styled-components';

type ClaimPOAPButtonProps = {
  variant?: 'medium' | 'big';
  marginBottom?: string;
  onClick?: () => void;
  text?: string;
};

export function ClaimPOAPButton({ variant = 'big', marginBottom, onClick, text = 'Claim POAP' }: ClaimPOAPButtonProps) {
  return (
    <StyledButton variant={variant} marginBottom={marginBottom} onClick={onClick}>
      {text}
    </StyledButton>
  );
}

type StyledButtonProps = {
  variant: 'medium' | 'big';
  marginBottom?: string;
};

const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  padding: 0 12px;
  line-height: 15px;
  font-size: 14px;
  font-weight: 500;
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  color: white;
  cursor: pointer;
  margin: 0 auto;

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
          height: 48px;
          border-radius: 16px;
        `;
      default:
        return '';
    }
  }}

  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}

  &:hover {
    background: linear-gradient(111.35deg, #4368eacf -25.85%, #c490ddcf 73.38%);
  }
`;
