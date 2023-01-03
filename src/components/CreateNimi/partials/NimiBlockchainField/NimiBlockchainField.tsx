import { NIMI_BLOCKCHAIN_LOGO_URL } from '@nimi.io/card/constants';
import { Nimi, NimiBlockchain } from '@nimi.io/card/types';
import { validateNimiBlockchainAddress } from '@nimi.io/card/validators';
import { ChangeEventHandler, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputFieldWithIcon } from '../../../Input';

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

    validateNimiBlockchainAddress({
      blockchain: blockchain,
      address: targetValue,
    })
      .then((isValidAddress) => {
        if (isValidAddress) {
          const addressPrevState = getValues('addresses') || [];
          addressPrevState[index] = {
            blockchain,
            address: targetValue,
          };
          setAddressValue('addresses', addressPrevState);
          setIsValueValid(true);
        } else {
          setIsValueValid(false);
        }
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
