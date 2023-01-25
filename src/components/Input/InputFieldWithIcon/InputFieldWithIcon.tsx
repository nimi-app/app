import { FC, SVGProps, useState } from 'react';
import styled from 'styled-components';

import XSVG from '../../../assets/svg/cross.svg';
import { SharedInputStyles } from '../../../theme';
import { renderSVG } from '../../../utils';
import { ErrorMessage } from '../../CreateNimi/styled';
import { InputButton } from '../../InputButton';

export interface InputFieldWithIcon {
  name?: string;
  inputLogo?: FC<SVGProps<SVGSVGElement>>;
  errorMessage?: string;
  placeholder: string;
  content: string;
  onClearClick?: any;
  onInputClick?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalidInput: boolean;
  id: string;
  isSimple?: boolean;
  style?: any;
  ref?: any;
}

/**
 * Handles the input for the link type
 */
export function InputFieldWithIcon({
  name,
  inputLogo,
  isInvalidInput,
  content,
  onChange,
  onClearClick,
  onInputClick,
  id,
  isSimple,
  style,
  ref,
}: InputFieldWithIcon) {
  const [inputTouched, setInputTouched] = useState(false);
  return (
    <InputContainer style={style} id={id}>
      <LogoContainer>{renderSVG(inputLogo, 15)}</LogoContainer>
      <ContentInput
        ref={ref}
        name={name}
        inputInvalid={inputTouched && isInvalidInput}
        value={content}
        onChange={onChange}
        spellCheck={false}
        onBlur={setInputTouched.bind(null, true)}
      />

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
export const ContentInput = styled.input<{ inputInvalid: boolean; paddingLeft?: string }>`
  height: 50px;
  padding: 8px 80px 8px ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '40px')};
  ${SharedInputStyles};
  background-color: white;
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
