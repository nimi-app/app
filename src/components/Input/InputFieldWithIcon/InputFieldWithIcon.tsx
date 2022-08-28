import { StyledInputWrapper, StyledInput, TrashCanStyle, StyledCross } from '../styleds';

import { ReactComponent as TrashCan } from '../../../assets/svg/trashcan.svg';

export interface InputFieldWithIcon {
  logo: any;
  placeholder: string;
  onInputFocus?: any;
  onBlur?: any;
  onChange: any;
  onDelete: any;
  onInputReset: any;
  value: any;
  id: any;
}

/**
 * Handles the input for the link type
 */
export function InputFieldWithIcon({
  logo,
  placeholder,
  onInputFocus,
  onBlur,
  onChange,
  onDelete,
  onInputReset,
  value,
  id,
}: InputFieldWithIcon) {
  return (
    <StyledInputWrapper>
      {logo && logo}
      <StyledInput
        onFocus={onInputFocus}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type="text"
        id={id}
      />
      {value.length > 0 && <StyledCross onClick={onInputReset} />}
      <TrashCanStyle onClick={onDelete}>
        <TrashCan />
      </TrashCanStyle>
    </StyledInputWrapper>
  );
}
