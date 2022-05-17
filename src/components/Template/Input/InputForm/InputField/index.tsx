import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { FieldType } from '../../../../../constants';

const StyledInputForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;
const Label = styled.label`
  color: #b1b5c4;
  font-weight: 600;
  font-size: 14px;
  line-height: 12px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;
const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e6e8ec;
  border-radius: 12px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #b1b5c3;
  }
`;

export function InputField({ name, dataType, styleOverride, placeholder }: FieldType) {
  const { register } = useFormContext();

  return (
    <StyledInputForm style={styleOverride}>
      <Label>{name}</Label>
      <Input type={dataType} placeholder={placeholder} {...register(name)} />
    </StyledInputForm>
  );
}
