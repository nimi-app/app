import { useState, ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { StyledCross, StyledInputWrapper } from '../NimiLinkField.styled';
import { ReactComponent as Pen } from '../../../../../assets/svg/pen.svg';

const LabelWrapper = styled.div`
  margin-bottom: 10px;
`;
export const StyledInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
  font-size: 16px;
  color: #8c90a0;
  font-weight: 500;
  font-size: 16px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #b3b8cb;
    font-weight: 400;
  }
`;
const LabelDisplay = styled.div`
  color: #8c90a0;
  font-weight: 400;
  display: flex;
  font-size: 16px;
  line-height: 18px;
  cursor: pointer;
  margin-left: 4px;
  &:hover {
    svg {
      display: flex;
    }
  }
`;
const InputWraper = styled.div``;
const StyledPen = styled(Pen)`
  display: none;
  margin-left: 5.67px;
`;

export interface LabelInputProps {
  defaultLabel: string;
}

/**
 * Handles the input for the link type
 */
export function LabelInput({ defaultLabel }: LabelInputProps) {
  const [label, setLabel] = useState(defaultLabel);
  const [showInput, setShowInput] = useState(false);
  console.log('here');
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // Extract the value from the event
    const targetValue = event.target.value;
    setLabel(targetValue);
    // Vlidate
  };
  return (
    <LabelWrapper>
      {showInput ? (
        <StyledInputWrapper>
          <StyledInput placeholder="Custom Title" type="text" onChange={onChange} value={label} />
          {label.length > 0 && (
            <StyledCross
              onClick={() => {
                setLabel(defaultLabel);
                setShowInput(false);
              }}
            />
          )}
        </StyledInputWrapper>
      ) : (
        <LabelDisplay onClick={() => setShowInput(true)}>
          {label} <StyledPen />
        </LabelDisplay>
      )}
    </LabelWrapper>
  );
}
