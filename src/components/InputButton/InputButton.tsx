import styled from 'styled-components';

import { ReactComponent as TrashCanSVG } from '../../assets/svg/trashcan.svg';
import { ReactComponent as SlidersSVG } from '../../assets/svg/sliders.svg';

type InputButtonProps = {
  variant?: string;
  displayInlineFlex?: boolean;
  marginRight?: string;
  onClick: () => void;
};

export const InputButton = ({ variant = 'trash-can', displayInlineFlex, marginRight, onClick }: InputButtonProps) => {
  return (
    <StyledButton onClick={onClick} displayInlineFlex={displayInlineFlex} marginRight={marginRight}>
      {variant === 'trash-can' && <TrashCanSVG />}
      {variant === 'sliders' && <SlidersSVG />}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ displayInlineFlex: boolean }>`
  ${({ displayInlineFlex }) =>
    displayInlineFlex
      ? `
        display: inline-flex;
      `
      : `
        display: flex;
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translate(0, -50%);
      `}
  height: 38px;
  width: 45px;
  justify-content: center;
  align-items: center;
  border: 2px solid #f3f3f1;
  border-radius: 15px;
  background-color: white;
  cursor: pointer;

  ${({ marginRight }) => marginRight && `margin-right: ${marginRight};`}

  &:hover path {
    fill: #8c90a0;
  }
`;
