import { NimiBlockchain, Nimi, blockchainAddresses, NIMI_BLOCKCHAIN_LOGO_URL } from '@nimi.io/card';
import { useFormContext } from 'react-hook-form';
import { ChangeEventHandler, useState } from 'react';

import { InputFieldWithIcon } from '../../../Input';
import { useTranslation } from 'react-i18next';

export interface NimiBlockchainFieldProps {
  blockchain: NimiBlockchain;
  index: number;
}

/**
 * Handles the input for blockchain address
 */
export function NimiBlockchainField({ blockchain, index }: NimiBlockchainFieldProps) {
  const { t } = useTranslation('nimi');
  const label = t(`formLabel.${blockchain.toLowerCase()}`);

  const { setValue: setAddressValue, getValues } = useFormContext<Nimi>();
  const [value, setValue] = useState('');
  const [isValueValid, setIsValueValid] = useState(false);

  //checks if address is valid and submits it to form if its
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const targetValue = event.target.value;

    setValue(targetValue);

    blockchainAddresses
      .isValid([
        {
          blockchain: blockchain,
          address: targetValue,
        },
      ])
      .then((isValidAddress) => {
        if (isValidAddress) {
          const addressPrevState = getValues('addresses') || [];

          addressPrevState[index] = { blockchain: blockchain, address: targetValue };
          setAddressValue('addresses', addressPrevState);
        }

        setIsValueValid(isValidAddress);
      })
      .catch(() => setIsValueValid(false));
  };

  //deletes address from the form
  const onDelete = () => {
    const addressesState = getValues('addresses') || [];

    addressesState.splice(index, 1);

    setAddressValue('addresses', addressesState);
  };

  return (
    <InputFieldWithIcon
      inputLogo={NIMI_BLOCKCHAIN_LOGO_URL[blockchain]}
      isInvalidInput={isValueValid}
      onChange={onChange}
      placeholder={`${label} address`}
      content={value}
      onClearClick={() => setValue('')}
      onInputClick={onDelete}
      // TODO: Add id to blockchainAddress in the card
      id={blockchain + index}
    />
  );
}
