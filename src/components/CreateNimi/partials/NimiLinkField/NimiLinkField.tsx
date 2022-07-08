import { Nimi, NimiLink, NimiLinkBaseDetails } from 'nimi-card';
import { useFormContext } from 'react-hook-form';
import { ChangeEventHandler } from 'react';

import { Input, Label } from '../../../form';

export interface NimiLinkFieldProps {
  link: NimiLink;
  label: string;
}

/**
 * Handles the input for the link type
 */
export function NimiLinkField({ link, label }: NimiLinkFieldProps) {
  const { setValue, getValues } = useFormContext<Nimi>();

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
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

  return (
    <>
      <Label htmlFor={link}>{label}</Label>
      <Input placeholder={`${label} link`} type="text" id={link} onChange={onChange} />
    </>
  );
}
