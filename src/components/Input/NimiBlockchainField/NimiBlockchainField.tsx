import { ErrorMessage } from '@hookform/error-message';
import { getNimiBlockchainLogoSVGElement } from '@nimi.io/card';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContentInput, InputFieldWithIcon, StyledError } from '..';

export interface NimiBlockchainFieldProps {
  index: number;
  key: string;
  removeAddress: (index: number) => void;
}

/**
 * Handles the input for blockchain address
 */
export function NimiBlockchainField({ removeAddress, index, key }: NimiBlockchainFieldProps) {
  const { t } = useTranslation('nimi');

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { blockchain, address } = getValues('addresses')[index];
  const label = t(`formLabel.${blockchain.toLowerCase()}`);

  return (
    <>
      <InputFieldWithIcon
        inputLogo={getNimiBlockchainLogoSVGElement(blockchain)}
        content={address}
        onClearClick={() => setValue(`addresses[${index}].address`, '')}
        onInputClick={() => removeAddress(index)}
        id={blockchain + index}
      >
        <ContentInput
          id={key}
          inputInvalid={errors.addresses?.[index]?.address.message.length > 0}
          placeholder={`${label} address`}
          {...register(`addresses[${index}].address`)}
        />
        <ErrorMessage
          errors={errors}
          name={`addresses[${index}].address`}
          render={({ message }) => <StyledError>{message}</StyledError>}
        />
      </InputFieldWithIcon>
    </>
  );
}
