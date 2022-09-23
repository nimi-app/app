import styled, { css } from 'styled-components';
import { ReorderItem } from '../ReorderItem';
import { NimiLinkBaseDetails, nimiLinkDetailsExtended } from '@nimi.io/card';

import { ReactComponent as XSVG } from '../../assets/svg/cross.svg';
import { ReactComponent as TrashCanSVG } from '../../assets/svg/trashcan.svg';
import { ReactComponent as SlidersSVG } from '../../assets/svg/sliders.svg';

import { renderSVG } from '../../utils';
import { useState } from 'react';

import { inputValidators } from './inputValidators';

type ReorderInputProps = {
  key?: string;
  value: NimiLinkBaseDetails;
  updateLink: (linkId: string, key: string, value: string) => void;
  removeLink: (linkId: string) => void;
};

export function ReorderInput({ value, updateLink, removeLink }: ReorderInputProps) {
  const [inputTouched, setInputTouched] = useState(false);
  const { type, title, content } = value;

  return (
    <ReorderItem value={value}>
      <InputContainer marginBottom="10px">
        <TitleInput
          value={title}
          onChange={(event) => updateLink(value.id!, 'title', event.target.value)}
          spellCheck={false}
          placeholder={type.replace(
            /(^\w)(\S*)/g,
            (_, firstLetter, restOfTheWord) => firstLetter + restOfTheWord.toLowerCase()
          )}
        />
        {title && <ClearButton onClick={() => updateLink(value.id!, 'title', '')} />}
      </InputContainer>
      <InputContainer>
        <Logo logo={renderSVG(nimiLinkDetailsExtended[type].logo, 15)} />
        <ContentInput
          inputInvalid={inputTouched && !inputValidators[type].test(content)}
          value={content}
          onChange={(event) => updateLink(value.id!, 'content', event.target.value)}
          spellCheck={false}
          onBlur={setInputTouched.bind(null, true)}
        />
        {content && <ClearButton right="57px" onClick={() => updateLink(value.id!, 'content', '')} />}
        <InputButton onClick={() => removeLink(value.id!)} />
      </InputContainer>
    </ReorderItem>
  );
}

const SharedInputStyles = css<{ inputInvalid?: boolean }>`
  width: 100%;
  line-height: 22px;
  font-size: 16px;
  font-weight: 400;
  color: #8c90a0;
  border-radius: 20px;
  border: none;
  outline: none;
  transition: all 0.1s linear;

  ${({ inputInvalid }) =>
    inputInvalid
      ? `
        border: 2px solid #EB5757;
        color: #EB5757;
      `
      : `
        &:focus {
          background-color: white;
          font-size: 18px;
          font-weight: 500;
          color: #5274ff;
          border: double 2px transparent;
          background-image: linear-gradient(white, white), linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          box-shadow: 0px 5px 14px rgba(188, 180, 180, 0.2);

          & + svg {
            visibility: visible;
            opacity: 1;
          }
        }
    `}
`;

const InputContainer = styled.div<{ marginBottom?: string }>`
  width: 100%;
  position: relative;

  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
`;

const TitleInput = styled.input`
  height: 38px;
  position: relative;
  padding: 8px 6px 8px 20px;
  ${SharedInputStyles}
  background-color: #f1f1f1;
`;

const ContentInput = styled.input<{ inputInvalid: boolean }>`
  height: 50px;
  padding: 8px 80px 8px 40px;
  ${SharedInputStyles}
  background-color: white;
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

const StyledButton = styled.button`
  height: 38px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translate(0, -50%);
  border: 2px solid #f3f3f1;
  border-radius: 15px;
  background-color: white;
  cursor: pointer;

  &:hover path {
    fill: #8c90a0;
  }
`;

type InputButtonProps = {
  variant?: string;
  onClick: () => void;
};

const InputButton = ({ variant = 'trash-can', onClick }: InputButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      {variant === 'trash-can' && <TrashCanSVG />}
      {variant === 'sliders' && <SlidersSVG />}
    </StyledButton>
  );
};

const LogoContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translate(0, -50%);
`;

const Logo = ({ logo }) => <LogoContainer>{logo}</LogoContainer>;
