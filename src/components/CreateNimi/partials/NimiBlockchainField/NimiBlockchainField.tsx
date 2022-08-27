import { NimiBlockchain, Nimi, blockchainAddresses } from 'nimi-card';
import { useFormContext } from 'react-hook-form';
import { ChangeEventHandler, useState } from 'react';

import { Input, Label } from '../../../form';

export interface NimiBlockchainFieldProps {
  blockchain: NimiBlockchain;
  label: string;
  index: number;
}

/**
 * Handles the input for blockchain address
 */
export function NimiBlockchainField({ blockchain, label, index }: NimiBlockchainFieldProps) {
  const { setValue: setAddressValue, getValues } = useFormContext<Nimi>();
  const [value, setValue] = useState('');
  const [isValueValid, setIsValueValid] = useState(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const targetValue = event.target.value;

    setValue(targetValue);

    blockchainAddresses
      .isValid({
        blockchain: blockchain,
        address: targetValue,
      })
      .then((isGut) => {
        console.log({ value });
        console.log('isValidShit', isGut);
        if (isGut) handleFormValue(targetValue);

        setIsValueValid(isGut);
      })
      .catch(() => setIsValueValid(false));
  };

  const handleFormValue = (newValue: string) => {
    const addressPrevState = getValues('addresses') || [];

    addressPrevState[index] = { blockchain: blockchain, address: newValue };
    setAddressValue('addresses', addressPrevState);
  };

  return (
    <>
      <Label htmlFor={blockchain}>{label}</Label>
      <Input value={value} placeholder={`${label} address`} type="text" id={blockchain} onChange={onChange} />
    </>
  );
}
