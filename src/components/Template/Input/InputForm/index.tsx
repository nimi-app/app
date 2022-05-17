import { FieldType } from '../../../../constants';
import { InputField } from './InputField';
import { StyledInputForm } from './styleds';

interface InputFormProps {
  inputFields: FieldType[];
}
export function InputForm({ inputFields }: InputFormProps) {
  return (
    <StyledInputForm>
      {inputFields.map(({ name, dataType, placeholder, styleOverride }, index) => (
        <InputField
          key={index}
          name={name}
          dataType={dataType}
          placeholder={placeholder}
          styleOverride={styleOverride}
        />
      ))}
    </StyledInputForm>
  );
}
