import { NimiBlockchain, Nimi, blockchainAddresses, NIMI_BLOCKCHAIN_LOGO_URL } from 'nimi-card';
import { useFormContext } from 'react-hook-form';
import { ChangeEventHandler, useMemo, useState } from 'react';

import { Input, Label } from '../../../form';
import { InputFieldWithIcon } from '../../../Input';
import { renderSVG } from '../../../../utils';

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
  const logo = useMemo(() => {
    return renderSVG(NIMI_BLOCKCHAIN_LOGO_URL[blockchain], 20);
  }, [blockchain]);
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

  const onDelete = () => {
    const addressesState = getValues('addresses') || [];
    console.log('linksPrevState', addressesState);
    addressesState.splice(index, 1);
    console.log('index', index);

    setAddressValue('addresses', addressesState);
  };

  return (
    <>
      {/* <Input value={value} placeholder={`${label} address`} type="text" id={blockchain} onChange={onChange} /> */}
      <InputFieldWithIcon
        logo={logo}
        onChange={onChange}
        placeholder={`${label} address`}
        onDelete={onDelete}
        onInputReset={() => setValue('')}
        value={value}
        id={blockchain + index}
      />
    </>
  );
}
