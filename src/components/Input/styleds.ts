import { styled } from 'styled-components';

import { ReactComponent as Cross } from '../../assets/svg/cross.svg';
import { SharedInputStyles } from '../../theme';

export const StyledInputWrapper = styled.div<{ isError?: boolean; isSimple?: boolean }>`
  display: flex;
  background: #ffffff;
  align-items: center;
  padding: 5.56px 6px;
  padding-left: 13px;

  position: relative;
  border-radius: 20px;
  box-sizing: border-box;
  background-clip: padding-box;
  border: 1px solid transparent;
  &:focus-within {
    &:before {
      background: ${({ isError }) =>
        isError ? '#EB5757' : 'linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);'};
    }
  }
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 2px; /* control the border thickness */
    background: ${({ isSimple, isError }) => (isError ? '#EB5757' : isSimple ? '#A1AAB8' : 'transperent')};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export const LinkFieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input`
  flex: 1;
  margin-left: 17px;
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
  font-size: 16px;
  color: #5274ff;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #b3b8cb;
  }

  &:hover,
  &:focus {
    ::placeholder,
    ::-webkit-input-placeholder {
      color: #8c90a0;
      cursor: pointer;
    }
  }
`;

export const StyledErrorText = styled.div`
  color: red;
  margin-top: 5px;
`;

export const TrashCanStyle = styled.div`
  width: 45px;
  height: 39px;
  border: 2px solid #f3f3f1;
  border-radius: 15.5556px;
  display: flex;
  padding: 9.33333px 12.4444px;
  cursor: pointer;
  &:hover,
  &:focus {
    svg > path {
      fill: #8c90a0;
    }
  }
`;

export const StyledCross = styled(Cross)`
  margin-right: 5.8px;
  cursor: pointer;
  &:hover {
    path {
      fill: #8c90a0;
    }
  }
`;

export const ContentInput = styled.input<{ inputInvalid: boolean; paddingLeft?: string; border?: string }>`
  height: 50px;
  padding: 8px 80px 8px ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '40px')};
  ${SharedInputStyles};
  background-color: white;
  ${({ border }) => border && `border:${border}`};
`;
