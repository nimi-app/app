import { Blockchain, Nimi, NimiBlockchainAddress } from 'nimi-card';
import { useFormContext } from 'react-hook-form';
import { ChangeEventHandler } from 'react';

import { Input, Label } from '../../../form';

export interface NimiBlockchainFieldProps {
  blockchain: Blockchain;
  label: string;
}

/**
 * Handles the input for blockchain address
 */
export function NimiBlockchainField({ blockchain, label }: NimiBlockchainFieldProps) {
  const { setValue, getValues } = useFormContext<Nimi>();

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const prevState = getValues('addresses') || [];
    const hasLink = prevState.some((prevLink) => prevLink.blockchain === blockchain);
    const newState: NimiBlockchainAddress[] = hasLink
      ? prevState.map((curr) => {
          if (curr.blockchain === blockchain) {
            return { ...curr, address: event.target.value };
          }

          return curr;
        })
      : [...prevState, { blockchain, address: event.target.value }];

    setValue('addresses', newState);
  };

  return (
    <>
      <Label htmlFor={blockchain}>{label}</Label>
      <Input type="text" id={blockchain} onChange={onChange} />
    </>
  );
}
