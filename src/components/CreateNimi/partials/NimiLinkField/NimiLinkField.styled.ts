import styled from 'styled-components';

export const StyledInputWrapper = styled.div<{ isInputFocused: boolean; isError: boolean }>`
  display: flex;
  border: 2px solid ${({ isInputFocused, isError }) => (isError ? 'red' : isInputFocused ? 'blue' : '#e6e8ec')};
  border-radius: 12px;
`;

export const StyledAtField = styled.div`
  background: #e6e8ec;
  border-radius: 10px 0 0 10px;
  padding: 12px 16px;
  color: #777e91;
`;

export const StyledInput = styled.input`
  padding: 12px 16px;
  flex: 1;
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #b1b5c3;
  }
`;

export const StyledErrorText = styled.div`
  color: red;
  margin-top: 5px;
`;
