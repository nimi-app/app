import { NIMI_BLOCKCHAIN_LOGO_URL } from '@nimi.io/card/constants';
import { NimiBlockchain, NimiBlockchainAddress } from '@nimi.io/card/types';
import { validateNimiBlockchainAddress } from '@nimi.io/card/validators';
import { ChangeEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { InputFieldWithIcon } from '../../../Input';

export interface NimiBlockchainFieldProps {
  blockchain: NimiBlockchain;
  index: number;
  removeAddress: (index: number) => void;
  updateAddress: (index: number, value: NimiBlockchainAddress) => void;
}

/**
 * Handles the input for blockchain address
 */
export function NimiBlockchainField({ updateAddress, removeAddress, blockchain, index }: NimiBlockchainFieldProps) {
  const { t } = useTranslation('nimi');
  const label = t(`formLabel.${blockchain.toLowerCase()}`);

  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);

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
          updateAddress(index, {
            blockchain,
            address: targetValue,
          });
          console.log('validation passed');
          setIsError(false);
        } else {
          console.log('validation failed');
          setIsError(true);
        }
      })
      .catch((e) => {
        console.log('validation failed catch block', e);
        setIsError(true);
      });
  };

  return (
    <InputFieldWithIcon
      inputLogo={NIMI_BLOCKCHAIN_LOGO_URL[blockchain]}
      isInvalidInput={isError}
      onChange={onChange}
      placeholder={`${label} address`}
      content={value}
      onClearClick={() => setValue('')}
      onInputClick={() => removeAddress(index)}
      // TODO: Add id to blockchainAddress in the card
      id={blockchain + index}
    />
  );
}
