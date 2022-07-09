import { NimiBlockchain, Nimi, NimiBlockchainAddress } from 'nimi-card';
import { useFormContext } from 'react-hook-form';
import { ChangeEventHandler } from 'react';

import { Input, Label } from '../../../form';
import { replaceOrAddArrayItem } from '../../../../utils';

export interface NimiBlockchainFieldProps {
  blockchain: NimiBlockchain;
  label: string;
}

/**
 * Handles the input for blockchain address
 */
export function NimiBlockchainField({ blockchain, label }: NimiBlockchainFieldProps) {
  const { setValue, getValues } = useFormContext<Nimi>();

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const prevState = getValues('addresses') || [];
    const newState = replaceOrAddArrayItem(prevState, blockchain, event.target.value);

    setValue('addresses', newState);
  };

  return (
    <>
      <Label htmlFor={blockchain}>{label}</Label>
      <Input placeholder={`${label} address`} type="text" id={blockchain} onChange={onChange} />
    </>
  );
}
