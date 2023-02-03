import { FC, PropsWithChildren, SVGProps } from 'react';
import { styled } from 'styled-components';

import XSVG from '../../../assets/svg/cross.svg';
import { renderSVG } from '../../../utils';
import { InputButton } from '../../InputButton';

export interface InputFieldWithIcon {
  inputLogo?: FC<SVGProps<SVGSVGElement>>;
  errorMessage?: string;
  content: string;
  onClearClick?: any;
  onInputClick?: any;
  id: string;
  isSimple?: boolean;
  style?: any;
}

/**
 * Handles the input for the link type
 */
export function InputFieldWithIcon({
  inputLogo,
  content,
  onClearClick,
  onInputClick,
  id,
  isSimple,
  style,
  children,
}: PropsWithChildren<InputFieldWithIcon>) {
  return (
    <InputContainer style={style} id={id}>
      <LogoContainer>{renderSVG(inputLogo, 15)}</LogoContainer>
      {children}
      {!isSimple && (
        <>
          {content && <ClearButton className="clear-button" right="57px" onClick={onClearClick} />}
          <InputButton onClick={onInputClick} />
        </>
      )}
    </InputContainer>
  );
}

const InputContainer = styled.div<{ marginBottom?: string }>`
  width: 100%;
  position: relative;
  background: #f0f3fb;
  height: 50px;
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
`;

const ClearButton = styled(XSVG)<{ right?: string }>`
  visibility: none;
  opacity: 0;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  cursor: pointer;
  ${({ right }) => right && `right: ${right};`}
  transition-property: opacity;
  transition-duration: 1s;
  transition-delay: 0.1;

  &:hover path {
    fill: #8c90a0;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translate(0, -50%);
`;
