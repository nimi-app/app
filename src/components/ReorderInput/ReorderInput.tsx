import { NIMI_LINK_DETAIL_EXTENDED } from '@nimi.io/card/constants';
import { NimiLinkBaseDetails } from '@nimi.io/card/types';
import { validateNimiLink } from '@nimi.io/card/validators';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import XSVG from '../../assets/svg/cross.svg';
import PenSVG from '../../assets/svg/pen.svg';
import { SharedInputStyles } from '../../theme';
import { InputFieldWithIcon } from '../Input';
import { ReorderItem } from '../ReorderItem';

type ReorderInputProps = {
  key?: string;
  index: number;
  value: NimiLinkBaseDetails;
  removeLink: (index: number) => void;
};
interface UpdateLinkProps {
  links: NimiLinkBaseDetails[];
  linkId: string;
  key: string;
  value: string;
  setValue: (key: string, value: NimiLinkBaseDetails[]) => void;
}
const updateLink = ({ links, linkId, key, value, setValue }: UpdateLinkProps) => {
  const updatedLinks = links.map((link) => (link.id === linkId ? { ...link, [key]: value } : link));

  setValue('links', updatedLinks);
};

export function ReorderInput({ value, index, removeLink }: ReorderInputProps) {
  const { getValues, setValue } = useFormContext();
  const [isInvalidInput, setInvalidInput] = useState(false);
  const { type, title, content, id } = value;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateLink({
      links: getValues('links'),
      linkId: id!,
      key: 'content',
      value: event.target.value,
      setValue,
    });
    validateNimiLink({
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
          onChange={(event) => updateLink(id!, 'title', event.target.value, index)}
          spellCheck={false}
          placeholder={type.replace(
            /(^\w)(\S*)/g,
            (_, firstLetter, restOfTheWord) => firstLetter + restOfTheWord.toLowerCase()
          )}
        />
        {title && <ClearButton className="clear-button" onClick={() => updateLink(id!, 'title', '', index)} />}

        <PenContainer className="pen-component">
          <PenPlaceholder>
            {title ||
              type.replace(/(^\w)(\S*)/g, (_, firstLetter, restOfTheWord) => firstLetter + restOfTheWord.toLowerCase())}
          </PenPlaceholder>
          <Pen />
        </PenContainer>
      </InputContainer>
      <InputFieldWithIcon
        inputLogo={NIMI_LINK_DETAIL_EXTENDED[type].logo}
        isInvalidInput={isInvalidInput}
        content={content}
        onChange={onChange}
        onClearClick={() => updateLink(id!, 'content', '', index)}
        onInputClick={() => removeLink(index)}
        placeholder={''}
        id={id! || ''}
      />
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
