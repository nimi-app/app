import { Nimi, NimiLink } from 'nimi-card';
import { useFormContext } from 'react-hook-form';
import { ChangeEventHandler, useEffect, useState } from 'react';

import { Input, Label } from '../../../form';
import { replaceOrAddArrayItem } from '../../../../utils';

export interface NimiLinkFieldProps {
  link: NimiLink;
  label: string;
}

/**
 * Handles the input for the link type
 */
export function NimiLinkField({ link, label }: NimiLinkFieldProps) {
  const { setValue, getValues } = useFormContext<Nimi>();
  const [inputValue, setInputValue] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);

    const prevState = getValues('links') || [];
    const newState = replaceOrAddArrayItem(prevState, link, event.target.value);

    setValue('links', newState);
  };

  useEffect(() => {
    const valuechange = getValues('links').find((prevLink) => prevLink.type === link);
    console.log(valuechange ? valuechange.url : 'njet');
    setInputValue(valuechange ? valuechange.url : inputValue);
  }, [getValues, link, inputValue]);

  return (
    <>
      <Label htmlFor={link}>{label}</Label>
      <Input value={inputValue} placeholder={`${label} link`} type="text" id={link} onChange={onChange} />
    </>
  );
}
