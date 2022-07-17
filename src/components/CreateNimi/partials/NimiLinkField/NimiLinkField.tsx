import { Nimi, NimiLink, NimiLinkBaseDetails } from 'nimi-card';
import { useFormContext } from 'react-hook-form';
import { ChangeEventHandler, useEffect, useState } from 'react';

import { Label } from '../../../form';
import { isValidUrl } from '../../../../utils';
import styled from 'styled-components';

export interface NimiLinkFieldProps {
  link: NimiLink;
  label: string;
}
const InputWrap = styled.div`
  display: flex;
  border: 2px solid #e6e8ec;
  border-radius: 12px;
`;
const AtFields = styled.div`
  /* border: 2px solid #e6e8ec;
  border-radius: 12px; */
  background: #e6e8ec;
  border-radius: 8px 0 0 8px;
  padding: 12px 16px;
  color: #777e91;
`;
const StyledInput = styled.input`
  padding: 12px 16px;
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #b1b5c3;
  }
`;

/**
 * Handles the input for the link type
 */
export function NimiLinkField({ link, label }: NimiLinkFieldProps) {
  const { setValue, getValues } = useFormContext<Nimi>();
  const [inputValue, setInputValue] = useState('');
  const hasAtField = link === ('twitter' || 'instagram' || 'telegram');
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log('input', isValidUrl(event.target.value) && link !== 'website');
    if (isValidUrl(event.target.value) && link !== 'website') return;
    setInputValue(event.target.value);

    const prevState = getValues('links') || [];
    const hasLink = prevState.some((prevLink) => prevLink.type === link);
    const newState: NimiLinkBaseDetails[] = hasLink
      ? prevState.map((curr) => {
          if (curr.type === link) {
            return { ...curr, url: event.target.value };
          }

          return curr;
        })
      : [...prevState, { type: link, label, url: event.target.value }];
    setValue('links', newState);
  };

  useEffect(() => {
    const valuechange = getValues('links').find((prevLink) => prevLink.type === link);
    setInputValue(valuechange ? valuechange.url : inputValue);
  }, [getValues, link, inputValue]);

  return (
    <>
      <Label htmlFor={link}>{label}</Label>
      <InputWrap>
        {hasAtField && <AtFields>@</AtFields>}

        <StyledInput
          value={inputValue}
          placeholder={`${label} ${link === 'website' ? 'link' : 'handle'}`}
          type="text"
          id={link}
          onChange={onChange}
        />
      </InputWrap>
    </>
  );
}
