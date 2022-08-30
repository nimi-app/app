import { StyledInputWrapper, StyledInput, TrashCanStyle, StyledCross } from '../styleds';

import { ReactComponent as TrashCan } from '../../../assets/svg/trashcan.svg';
import { FocusEventHandler } from 'react';

export interface InputFieldWithIcon {
  logo?: JSX.Element;
  placeholder: string;
  onInputFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onInputReset: () => void;
  value: string;
  id: string;
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
