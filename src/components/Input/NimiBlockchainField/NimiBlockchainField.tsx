import { ErrorMessage } from '@hookform/error-message';
import { NIMI_BLOCKCHAIN_LOGO_URL } from '@nimi.io/card/constants';
import { NimiBlockchainAddress } from '@nimi.io/card/types';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContentInput, InputFieldWithIcon } from '..';

export interface NimiBlockchainFieldProps {
  fieldValue: NimiBlockchainAddress;
  index: number;
  key: string;
  removeAddress: (index: number) => void;
  updateAddress: (index: number, value: NimiBlockchainAddress) => void;
}

/**
 * Handles the input for blockchain address
 */
export function NimiBlockchainField({
  updateAddress,
  removeAddress,
  fieldValue,
  index,
  key,
}: NimiBlockchainFieldProps) {
  const { t } = useTranslation('nimi');
  const { blockchain, address } = fieldValue;
  console.log('field', fieldValue);
  const label = t(`formLabel.${blockchain.toLowerCase()}`);
  const {
    register,
    formState: { errors, isValid },
  } = useFormContext();
  console.log('errors', errors);

  return (
    <>
      <InputFieldWithIcon
        inputLogo={NIMI_BLOCKCHAIN_LOGO_URL[blockchain]}
        content={address}
        onClearClick={() => updateAddress(index, { blockchain, address: '' })}
        onInputClick={() => removeAddress(index)}
        id={blockchain + index}
      >
        <ContentInput
          id={key}
          inputInvalid={errors.addresses?.[index]?.address.message.length > 0}
          placeholder={`${label} address`}
          {...register(`addresses[${index}].address`)}
        />
      </InputFieldWithIcon>
      <ErrorMessage errors={errors} name={`addresses[${index}].address`} render={({ message }) => <p>{message}</p>} />
    </>
  );
}
