import styled from 'styled-components';
import { InputField } from './InputField';

const StyledInputForm = styled.form`
  display: flex;
  width: 100%;
  gap: 28px;
  flex-flow: row-wrap;
  flex-wrap: wrap;
`;

const customInputFieldsObject = [
  {
    name: 'Username',
    dataType: 'text',
    required: true,
    styleOverride: { flexBasis: '100%' },
    placeholder: 'username',
  },
  {
    name: 'Infor2',
    required: false,
    dataType: 'text',
    styleOverride: { flexBasis: '100%' },
    placeholder: 'info2',
  },
  {
    name: 'Twitter',
    required: false,
    dataType: 'text',
    styleOverride: { flexBasis: '100%' },
    placeholder: 'usrename',
  },
  {
    name: 'Website',
    required: false,
    dataType: 'URL',
    styleOverride: { flexBasis: '100%' },
    placeholder: 'url',
  },
];
// interface InputFormProps {

// }
export function InputForm({ inputFields }) {
  return (
    <StyledInputForm>
      {inputFields.map(({ name, dataType, placeholder, styleOverride }) => (
        <InputField name={name} dataType={dataType} placeholder={placeholder} styleOverride={styleOverride} />
      ))}
      {/* <InputField name="Username" dataType="text" styleOverride={{ flexBasis: '100%' }} />
      <InputField
        name="Description"
        dataType="text"
        placeholder="Description here...."
        styleOverride={{ flexBasis: '100%' }}
      />
      <InputField name="Twitter" placeholder="Twitter" dataType="text" />
      <InputField name="Instagram" placeholder="Username" dataType="text" />
      <InputField name="Email" placeholder="email@mail.com" dataType="email" />
      <InputField name="Website" placeholder="URL" dataType="url" /> */}
    </StyledInputForm>
  );
}
