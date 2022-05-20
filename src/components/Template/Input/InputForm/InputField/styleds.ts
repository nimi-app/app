import styled from 'styled-components';

export const StyledInputForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;
export const Label = styled.label`
  color: #b1b5c4;
  font-weight: 600;
  font-size: 14px;
  line-height: 12px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;
export const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e6e8ec;
  border-radius: 12px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #b1b5c3;
  }
`;
