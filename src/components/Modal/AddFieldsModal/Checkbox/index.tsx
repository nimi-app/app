import { Fields, FieldsMapping } from '../../../../constants';

import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Wrapper, StyledCheckbox, StyledLabel } from './styleds';

interface CheckboxProps {
  registerFields: UseFormRegister<FieldValues>;
  field: Fields;
}

export function Checkbox({ field, registerFields }: CheckboxProps) {
  return (
    <Wrapper>
      <StyledCheckbox
        id={FieldsMapping[field].name}
        type="checkbox"
        {...registerFields(FieldsMapping[field].name)}
      ></StyledCheckbox>
      <StyledLabel htmlFor={FieldsMapping[field].name}>{FieldsMapping[field].name}</StyledLabel>
    </Wrapper>
  );
}
