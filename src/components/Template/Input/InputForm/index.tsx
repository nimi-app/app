import styled from 'styled-components';
import { InputField } from './InputField';

const StyledInputForm = styled.form`
  display: flex;
  width: 100%;
  gap: 28px;
  flex-flow: row-wrap;
  flex-wrap: wrap;
`;

// interface InputFormProps {

// }
export function InputForm({ inputFields }) {
  return (
    <StyledInputForm>
      {inputFields.map(({ name, dataType, placeholder, styleOverride }) => (
        <InputField name={name} dataType={dataType} placeholder={placeholder} styleOverride={styleOverride} />
      ))}
    </StyledInputForm>
  );
}
