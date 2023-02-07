import { ErrorMessage } from '@hookform/error-message';
import { getNimiLinkLogoSVGElement } from '@nimi.io/card';
import { NimiLinkBaseDetails } from '@nimi.io/card/types';
import { useFormContext } from 'react-hook-form';
import { styled } from 'styled-components';

import { ContentInput, InputFieldWithIcon } from '..';
import { ReactComponent as XSVG } from '../../../assets/svg/cross.svg';
import { ReactComponent as PenSVG } from '../../../assets/svg/pen.svg';
import { SharedInputStyles } from '../../../theme';
import { ReorderItem } from '../../ReorderItem';

type ReorderInputProps = {
  key?: string;
  index: number;
  removeLink: (index: number) => void;
  field: NimiLinkBaseDetails;
};

export function ReorderInput({ index, removeLink, field, key }: ReorderInputProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { type, title, content, id } = field;

  return (
    <ReorderItem value={field}>
      <InputContainer marginBottom="10px">
        <TitleInput
          key={id + 'title'}
          {...register(`links[${index}].title`)}
          spellCheck={false}
          placeholder={type.replace(
            /(^\w)(\S*)/g,
            (_, firstLetter, restOfTheWord) => firstLetter + restOfTheWord.toLowerCase()
          )}
        />
        {title && <ClearButton className="clear-button" onClick={() => setValue(`links[${index}].title`, '')} />}

        <PenContainer className="pen-component">
          <PenPlaceholder>
            {title ||
              type.replace(/(^\w)(\S*)/g, (_, firstLetter, restOfTheWord) => firstLetter + restOfTheWord.toLowerCase())}
          </PenPlaceholder>
          <Pen />
        </PenContainer>
      </InputContainer>
      <InputFieldWithIcon
        inputLogo={getNimiLinkLogoSVGElement(type)}
        content={content}
        onClearClick={() => setValue(`links[${index}].content`, '')}
        onInputClick={() => removeLink(index)}
        id={id! || ''}
      >
        <ContentInput
          inputInvalid={errors.links?.[index]?.content.message.length > 0}
          key={key}
          spellCheck={false}
          {...register(`links[${index}].content`)}
        />
      </InputFieldWithIcon>
      <ErrorMessage
        errors={errors}
        name={`links[${index}].content`}
        render={({ message }) => <StyledError>{message}</StyledError>}
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

export const StyledError = styled.p`
  color: #eb5757;
  font-size: 12px;
  margin: 0;
  margin-top: 5px;
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
