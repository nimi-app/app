import { FieldsMapping } from '../../../../constants';

import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Wrapper, StyledCheckbox, StyledLabel } from './styleds';

interface CheckboxProps {
  registerFields: UseFormRegister<FieldValues>;
  field: number;
}

export function Checkbox({ field, registerFields }: CheckboxProps) {
  return (
    <Wrapper>
      <StyledCheckbox type="checkbox" {...registerFields(FieldsMapping[field].name)}></StyledCheckbox>
      <StyledLabel>{FieldsMapping[field].name}</StyledLabel>
    </Wrapper>
  );
}
