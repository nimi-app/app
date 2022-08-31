import { useState } from 'react';
import styled from 'styled-components';
import { StyledCross, StyledInputWrapper } from '../../../../Input';
import { ReactComponent as Pen } from '../../../../../assets/svg/pen.svg';
import { LinkState } from '../NimiLinkField';

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
  onTitleChange: any;
  title?: string;
  defaultTitle: string;
}

/**
 * Handles the input for the link type
 */
export function TitleInput({ onTitleChange, title, defaultTitle }: TitleInputProps) {
  const [showInput, setShowInput] = useState(false);
  const [titleState, setTitleState] = useState<LinkState>(LinkState.IDLE);

  return (
    <TitleWrapper>
      {showInput || title ? (
        <StyledInputWrapper state={titleState}>
          <StyledInput
            placeholder="Custom Title"
            type="text"
            onChange={(event) => onTitleChange(event?.target.value)}
            value={title}
            onBlur={() => setTitleState(LinkState.IDLE)}
            onFocus={() => setTitleState(LinkState.ACTIVE)}
          />
          {title && title?.length > 0 && (
            <StyledCross
              onClick={() => {
                onTitleChange('');
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
