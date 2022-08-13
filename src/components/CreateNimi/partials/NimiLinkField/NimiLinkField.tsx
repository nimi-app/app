import { Nimi, NimiLinkBaseDetails, NimiLinkType } from 'nimi-card';
import { useFormContext } from 'react-hook-form';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Label } from '../../../form';
import { isValidUrl } from '../../../../utils';
import styled from 'styled-components';

export interface NimiLinkFieldProps {
  link: NimiLinkType;
  label: string;
}
const InputWrap = styled.div<{ isInputFocused: boolean; isError: boolean }>`
  display: flex;
  border: 2px solid ${({ isInputFocused, isError }) => (isError ? 'red' : isInputFocused ? 'blue' : '#e6e8ec')};
  border-radius: 12px;
`;
const AtField = styled.div`
  background: #e6e8ec;
  border-radius: 10px 0 0 10px;
  padding: 12px 16px;
  color: #777e91;
`;
const StyledInput = styled.input`
  padding: 12px 16px;
  flex: 1;
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #b1b5c3;
  }
`;
const ErroText = styled.div`
  color: red;
  margin-top: 5px;
`;

const PlaceholderMapping = {
  url: 'nimi.eth.limo',
  website: 'nimi.eth.limo',
  email: 'email@email.com',
  twitter: '0xNimi',
  instagram: '0xNimi',
  telegram: 'NimiEth',
  github: 'nimi-app',
  medium: '0xNimi',
  reddit: '0xNimi',
  facebook: 'Username',
  lenster: 'nimi.lens',
  discord: 'nimi#0001',
  youtube: 'Username',
  linkedin: 'Username',
};

/**
 * Handles the input for the link type
 */
export function NimiLinkField({ link, label }: NimiLinkFieldProps) {
  const { setValue, getValues } = useFormContext<Nimi>();
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isError, setIsError] = useState(false);
  const hasAtField = [NimiLinkType.TWITTER, NimiLinkType.INSTAGRAM, NimiLinkType.TELEGRAM].includes(link);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (isValidUrl(event.target.value) && link === NimiLinkType.URL) {
      setIsError(true);
    } else {
      setIsError(false);
    }

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
      : [...prevState, { type: link, label, content: event.target.value }];
    setValue('links', newState);
  };

  useEffect(() => {
    const valuechange = getValues('links').find((prevLink) => prevLink.type === link);
    setInputValue(valuechange ? valuechange.content : inputValue);
  }, [getValues, link, inputValue]);

  return (
    <>
      <Label htmlFor={link}>{label}</Label>
      <InputWrap isError={isError} isInputFocused={isInputFocused}>
        {hasAtField && <AtField>@</AtField>}

        <StyledInput
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          value={inputValue}
          placeholder={PlaceholderMapping[link]}
          type="text"
          id={link}
          onChange={onChange}
        />
      </InputWrap>
      {isError && <ErroText>Only insert your username</ErroText>}
    </>
  );
}
