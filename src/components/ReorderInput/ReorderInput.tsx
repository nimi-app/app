import { NIMI_LINK_DETAIL_EXTENDED } from '@nimi.io/card/constants';
import { NimiLinkBaseDetails } from '@nimi.io/card/types';
import { validateNimiLink } from '@nimi.io/card/validators';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import XSVG from '../../assets/svg/cross.svg';
import PenSVG from '../../assets/svg/pen.svg';
import { SharedInputStyles } from '../../theme';
import { ErrorMessage } from '../CreateNimi/styled';
import { InputFieldWithIcon } from '../Input';
import { ReorderItem } from '../ReorderItem';

type ReorderInputProps = {
  key?: string;
  index: number;
  value: NimiLinkBaseDetails;
  removeLink: (index: number) => void;
  updateLink: (index: number, value: NimiLinkBaseDetails) => void;
};

export function ReorderInput({ value, index, removeLink, updateLink }: ReorderInputProps) {
  const [isInvalidInput, setInvalidInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register } = useFormContext();
  const { type, title, content, id } = value;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateLink(index, { ...value, content: event.target.value });
    validateNimiLink({
      type,
      content: event.target.value,
    })
      .then((isValidLink) => {
        setErrorMessage('');
        setInvalidInput(!isValidLink);
      })
      .catch((e) => {
        setErrorMessage(e.message);
        setInvalidInput(true);
      });
  };

  return (
    <ReorderItem value={value}>
      <InputContainer marginBottom="10px">
        <TitleInput
          id="title-input"
          value={title}
          onChange={(event) =>
            updateLink(index, {
              ...value,
              title: event.target.value,
            })
          }
          spellCheck={false}
          placeholder={type.replace(
            /(^\w)(\S*)/g,
            (_, firstLetter, restOfTheWord) => firstLetter + restOfTheWord.toLowerCase()
          )}
        />
        {title && <ClearButton className="clear-button" onClick={() => updateLink(index, { ...value, title: '' })} />}

        <PenContainer className="pen-component">
          <PenPlaceholder>
            {title ||
              type.replace(/(^\w)(\S*)/g, (_, firstLetter, restOfTheWord) => firstLetter + restOfTheWord.toLowerCase())}
          </PenPlaceholder>
          <Pen />
        </PenContainer>
      </InputContainer>
      <InputFieldWithIcon
        name={`links[${index}].content`}
        ref={register}
        errorMessage={errorMessage}
        inputLogo={NIMI_LINK_DETAIL_EXTENDED[type].logo}
        isInvalidInput={isInvalidInput}
        content={content}
        onChange={onChange}
        onClearClick={() => updateLink(index, { ...value, content: '' })}
        onInputClick={() => removeLink(index)}
        placeholder={''}
        id={id! || ''}
      />
      {isInvalidInput && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </ReorderItem>
  );
}

const InputContainer = styled.div<{ marginBottom?: string }>`
  width: 100%;
  position: relative;
  background: #f0f3fb;
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
`;

const TitleInput = styled.input`
  height: 38px;
  position: relative;
  padding: 8px 30px 8px 20px;
  ${SharedInputStyles}
  background-color:  #F0F3FB;

  &:hover:not(:focus) ~ .pen-component {
    display: flex;
  }

  &:focus ~ .pen-component {
    display: none;
  }
`;

export const ContentInput = styled.input<{ inputInvalid: boolean; paddingLeft?: string; border?: string }>`
  height: 50px;
  padding: 8px 80px 8px ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '40px')};
  ${SharedInputStyles};
  background-color: white;
  ${({ border }) => border && `border:${border}`};
`;

const ClearButton = styled(XSVG)<{ right?: string }>`
  visibility: none;
  opacity: 0;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  cursor: pointer;
  ${({ right }) => right && `right: ${right};`}
  transition-property: opacity;
  transition-duration: 1s;
  transition-delay: 0.1;

  &:hover path {
    fill: #8c90a0;
  }
`;

const PenContainer = styled.div`
  display: none;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translate(0, -50%);
`;

const PenPlaceholder = styled.p`
  display: inline-block;
  visibility: hidden;
`;

const Pen = styled(PenSVG)`
  display: inline-block;
  cursor: pointer;
`;
