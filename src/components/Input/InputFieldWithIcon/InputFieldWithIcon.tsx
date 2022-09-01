import { StyledInputWrapper, StyledInput, TrashCanStyle, StyledCross } from '../styleds';

import { ReactComponent as TrashCan } from '../../../assets/svg/trashcan.svg';
import { ReactComponent as Error } from '../../../assets/svg/alert.svg';

import { FocusEventHandler, useEffect, useState } from 'react';

export interface InputFieldWithIcon {
  logo?: JSX.Element;
  state?: InputState;
  placeholder: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onInputReset: () => void;
  isValid: boolean;
  value: string;
  id: string;
}

export enum InputState {
  IDLE,
  ACTIVE,
  ERROR,
}

/**
 * Handles the input for the link type
 */
export function InputFieldWithIcon({
  logo,
  isValid,
  state,
  placeholder,
  onBlur,
  onChange,
  onDelete,
  onInputReset,
  value,
  id,
}: InputFieldWithIcon) {
  const [linkState, setLinkState] = useState<InputState>();
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    //hook for handling input state
    if (!isValid && value.length !== 0) {
      const newTimeoutId = setTimeout(() => {
        setLinkState(InputState.ERROR);
      }, 2222);
      if (isInputFocused) setLinkState(InputState.ACTIVE);
      else setLinkState(InputState.IDLE);
      return () => {
        clearTimeout(newTimeoutId);
      };
    } else if (isInputFocused) setLinkState(InputState.ACTIVE);
    else return setLinkState(InputState.IDLE);
  }, [isInputFocused, isValid, value]);

  return (
    <StyledInputWrapper state={linkState}>
      {state === InputState.ERROR ? <Error /> : logo}
      <StyledInput
        onFocus={() => setIsInputFocused(true)}
        onBlur={(event) => {
          onBlur && onBlur(event);
          if (!isValid) setLinkState(InputState.ERROR);
          else setIsInputFocused(false);
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
