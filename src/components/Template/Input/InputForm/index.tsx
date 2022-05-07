import styled from 'styled-components';
import { InputField } from './InputField';

const StyledInputForm = styled.form`
  display: flex;
  width: 100%;
  gap: 28px;
  flex-flow: row-wrap;
  flex-wrap: wrap;
`;

export function InputForm(pro) {
  return (
    <StyledInputForm>
      <InputField name="Username" dataType="text" styleOverride={{ flexBasis: '100%' }} />
      <InputField
        name="Description"
        dataType="text"
        placeholder="Description here...."
        styleOverride={{ flexBasis: '100%' }}
      />
      <InputField name="Twitter" placeholder="Twitter" dataType="text" />
      <InputField name="Instagram" placeholder="Username" dataType="text" />
      <InputField name="Email" placeholder="email@mail.com" dataType="email" />
      <InputField name="Website" placeholder="URl" dataType="url" />
    </StyledInputForm>
  );
}
