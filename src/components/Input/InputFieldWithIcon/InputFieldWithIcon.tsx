import { StyledInputWrapper, StyledInput, TrashCanStyle, StyledCross } from 'components/Input/styleds';

import { ReactComponent as TrashCan } from 'assets/svg/trashcan.svg';
import { ReactComponent as Error } from 'assets/svg/alert.svg';

import { FocusEventHandler, useEffect, useState } from 'react';

export interface InputFieldWithIcon {
  logo?: JSX.Element;
  placeholder: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onInputReset: () => void;
  isValid: boolean;
  value: string;
  id: string;
}

/**
 * Handles the input for the link type
 */
export function InputFieldWithIcon({
  logo,
  isValid,
  placeholder,
  onBlur,
  onChange,
  onDelete,
  onInputReset,
  value,
  id,
}: InputFieldWithIcon) {
  const [isError, setIsError] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    //hook for handling error state
    if (!isValid && value.length !== 0) {
      const newTimeoutId = setTimeout(() => {
        setIsError(true);
      }, 2222);

      return () => {
        clearTimeout(newTimeoutId);
      };
    } else {
      setIsError(false);
    }
  }, [isInputFocused, isValid, value]);

  return (
    <StyledInputWrapper isError={isError}>
      {isError ? <Error /> : logo}
      <StyledInput
        onFocus={() => setIsInputFocused(true)}
        onBlur={(event) => {
          onBlur && onBlur(event);
          if (!isValid) setIsError(true);
        }}
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
