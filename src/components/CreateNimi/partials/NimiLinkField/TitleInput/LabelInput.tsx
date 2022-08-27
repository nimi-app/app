import { useState, ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { StyledCross, StyledInputWrapper } from '../NimiLinkField.styled';
import { ReactComponent as Pen } from '../../../../../assets/svg/pen.svg';
import { useFormContext } from 'react-hook-form';
import { Nimi, NimiLinkBaseDetails } from 'nimi-card';

const TitleWrapper = styled.div`
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
const TitleDisplay = styled.div`
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

const StyledPen = styled(Pen)`
  display: none;
  margin-left: 5.67px;
`;

export interface TitleInputProps {
  setTitle: any;
  title: string;
  defaultTitle: string;
  index: number;
}

/**
 * Handles the input for the link type
 */
export function TitleInput({ title, setTitle, index, defaultTitle }: TitleInputProps) {
  const [showInput, setShowInput] = useState(false);
  const { setValue: setFormValue, getValues: getFormValues } = useFormContext<Nimi>();
  console.log('here');
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // Extract the value from the event
    const targetValue = event.target.value;
    setTitle(targetValue);
    // Vlidate

    const linksPrevState = getFormValues('links') || [];

    console.log('linksPrevState', linksPrevState);
    const currentState = linksPrevState[index] as NimiLinkBaseDetails;
    linksPrevState[index] = { type: currentState.type, title: targetValue, content: currentState.content };
    setFormValue('links', linksPrevState);
  };
  return (
    <TitleWrapper>
      {showInput ? (
        <StyledInputWrapper>
          <StyledInput placeholder="Custom Title" type="text" onChange={onChange} value={title} />
          {title.length > 0 && (
            <StyledCross
              onClick={() => {
                setTitle('');
                setShowInput(false);
              }}
            />
          )}
        </StyledInputWrapper>
      ) : (
        <TitleDisplay onClick={() => setShowInput(true)}>
          {defaultTitle}
          <StyledPen />
        </TitleDisplay>
      )}
    </TitleWrapper>
  );
}
