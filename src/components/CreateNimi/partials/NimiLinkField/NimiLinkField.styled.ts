import styled from 'styled-components';
import { ReactComponent as Cross } from '../../../../assets/svg/cross.svg';

export const StyledInputWrapper = styled.div`
  display: flex;
  border-radius: 20px;
  background: #ffffff;
  align-items: center;
  padding: 5.56px 6px;
  padding-left: 13px;
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
