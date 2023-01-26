import { NIMI_BLOCKCHAIN_LOGO_URL } from '@nimi.io/card/constants';
import { NimiBlockchainAddress } from '@nimi.io/card/types';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContentInput, InputFieldWithIcon } from '../../../Input';

export interface NimiBlockchainFieldProps {
  field: NimiBlockchainAddress;
  index: number;
  removeAddress: (index: number) => void;
  updateAddress: (index: number, value: NimiBlockchainAddress) => void;
}

/**
 * Handles the input for blockchain address
 */
export function NimiBlockchainField({ updateAddress, removeAddress, field, index }: NimiBlockchainFieldProps) {
  const { t } = useTranslation('nimi');
  const { blockchain, address } = field;
  console.log('field', field);
  const label = t(`formLabel.${field.blockchain.toLowerCase()}`);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  console.log('errors', errors.addresses?.[index].address.message);
  // //checks if address is valid and submits it to form if its
  // const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   const targetValue = event.target.value;

  //   setValue(targetValue);

  //   validateNimiBlockchainAddress({
  //     blockchain: blockchain,
  //     address: targetValue,
  //   })
  //     .then((isValidAddress) => {
  //       if (isValidAddress) {
  //         updateAddress(index, {
  //           blockchain,
  //           address: targetValue,
  //         });

  //         setIsError(false);
  //       } else {
  //         setIsError(true);
  //       }
  //     })
  //     .catch(() => {
  //       setIsError(true);
  //     });
  // };

  return (
    <InputFieldWithIcon
      inputLogo={NIMI_BLOCKCHAIN_LOGO_URL[blockchain]}
      content={address}
      onClearClick={() => updateAddress(index, { blockchain, address: '' })}
      onInputClick={() => removeAddress(index)}
      // TODO: Add id to blockchainAddress in the card
      id={blockchain + index}
    >
      <ContentInput
        id={blockchain + index}
        placeholder={`${label} address`}
        {...register(`addresses[${index}].address`)}
      />
    </InputFieldWithIcon>
  );
}
