import { useFormContext } from 'react-hook-form';
import { FieldType } from '../../../../../constants';
import { Input, Label, StyledInputForm } from './styleds';

export function InputField({ name, dataType, styleOverride, placeholder }: FieldType) {
  const { register } = useFormContext();

  return (
    <StyledInputForm style={styleOverride}>
      <Label>{name}</Label>
      <Input type={dataType} placeholder={placeholder} {...register(name)} />
    </StyledInputForm>
  );
}
