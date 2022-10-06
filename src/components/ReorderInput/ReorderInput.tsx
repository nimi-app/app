import { useState } from 'react';
import styled, { css } from 'styled-components';
import { ReorderItem } from '../ReorderItem';
import { NimiLinkBaseDetails, nimiLinkDetailsExtended, nimiLinkValidator } from '@nimi.io/card';
import { InputButton } from '../InputButton';

import { ReactComponent as XSVG } from '../../assets/svg/cross.svg';
import { ReactComponent as PenSVG } from '../../assets/svg/pen.svg';

import { renderSVG } from '../../utils';

type ReorderInputProps = {
  key?: string;
  value: NimiLinkBaseDetails;
  updateLink: (linkId: string, key: string, value: string) => void;
  removeLink: (linkId: string) => void;
};

// Zett, are you sure you want to change link type SVG icon to exclamation mark in case of invalid input?
// User might change title to e.g. bejzik8 and he might forget what is the type of link.
// I can easily update this if necessary.

export function ReorderInput({ value, updateLink, removeLink }: ReorderInputProps) {
  const [inputTouched, setInputTouched] = useState(false);
  const [isInvalidInput, setInvalidInput] = useState(false);
  const { type, title, content } = value;

  const onChange = (event) => {
    updateLink(value.id!, 'content', event.target.value);
    nimiLinkValidator
      .isValid({
        type,
        content: event.target.value,
      })
      .then((isValidLink) => {
        setInvalidInput(!isValidLink);
      })
      .catch(() => {
        setInvalidInput(true);
      });
  };

  return (
    <ReorderItem value={value}>
      <InputContainer marginBottom="10px">
        <TitleInput
          id="title-input"
          value={title}
          onChange={(event) => updateLink(value.id!, 'title', event.target.value)}
          spellCheck={false}
          placeholder={type.replace(
            /(^\w)(\S*)/g,
            (_, firstLetter, restOfTheWord) => firstLetter + restOfTheWord.toLowerCase()
          )}
        />
        {title && <ClearButton className="clear-button" onClick={() => updateLink(value.id!, 'title', '')} />}
        <PenComponent
          text={
            title ||
            type.replace(/(^\w)(\S*)/g, (_, firstLetter, restOfTheWord) => firstLetter + restOfTheWord.toLowerCase())
          }
        />
      </InputContainer>
      <InputContainer>
        <Logo logo={renderSVG(nimiLinkDetailsExtended[type].logo, 15)} />
        <ContentInput
          inputInvalid={inputTouched && isInvalidInput}
          value={content}
          onChange={onChange}
          spellCheck={false}
          onBlur={setInputTouched.bind(null, true)}
        />
        {content && (
          <ClearButton className="clear-button" right="57px" onClick={() => updateLink(value.id!, 'content', '')} />
        )}
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

  &:focus {
    background-color: white;
    font-size: 18px;
    font-weight: 500;
    box-shadow: 0px 5px 14px rgba(188, 180, 180, 0.2);

    & + .clear-button {
      visibility: visible;
      opacity: 1;
    }

    color: #5274ff;
    border: double 2px transparent;
    background-image: linear-gradient(white, white), linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }

  ${({ inputInvalid }) =>
    inputInvalid &&
    `
      border: 2px solid #EB5757;
      color: #EB5757;
    `}
`;

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

const PenComponent = ({ text }) => (
  <PenContainer className="pen-component">
    <PenPlaceholder>{text}</PenPlaceholder>
    <Pen />
  </PenContainer>
);

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

const LogoContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translate(0, -50%);
`;

const Logo = ({ logo }) => <LogoContainer>{logo}</LogoContainer>;
