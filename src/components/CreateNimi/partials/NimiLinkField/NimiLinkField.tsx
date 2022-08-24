import { Nimi, NimiLinkBaseDetails, NimiLinkType, link as linkValidator, nimiLinkDetailsExtended } from 'nimi-card';
import isURL from 'validator/lib/isURL';

import { useFormContext } from 'react-hook-form';
import { ChangeEventHandler, FocusEventHandler, useState } from 'react';

import { Label } from '../../../form';
import { StyledInputWrapper, StyledAtField, StyledInput } from './NimiLinkField.styled';
import { renderSVG } from '../../../../utils';
import { Button } from 'rebass';

/**
 * Map NimiLinkType to the correct placeholder text
 */
const nimiLinkTypePlaceholder: Record<NimiLinkType, string> = {
  [NimiLinkType.URL]: 'https://nimi.eth.limo',
  [NimiLinkType.EMAIL]: 'email@email.com',
  [NimiLinkType.TWITTER]: '0xNimi',
  [NimiLinkType.INSTAGRAM]: '0xNimi',
  [NimiLinkType.TELEGRAM]: 'NimiEth',
  [NimiLinkType.GITHUB]: 'nimi-app',
  [NimiLinkType.MEDIUM]: '0xNimi',
  [NimiLinkType.REDDIT]: '0xNimi',
  [NimiLinkType.LENSTER]: 'nimi.lens',
  [NimiLinkType.DISCORD]: 'nimi#0001',
  [NimiLinkType.YOUTUBE_CHANNEL]: 'Username',
  [NimiLinkType.LINKEDIN]: 'Username',
  [NimiLinkType.TWITCH]: 'Twitch Username',
};

export interface NimiLinkFieldProps {
  link: NimiLinkType;
  label: string;
  index: number;
}

/**
 * Handles the input for the link type
 */
export function NimiLinkField({ link, label, index }: NimiLinkFieldProps) {
  // Form context
  const { setValue: setFormValue, getValues: getFormValues } = useFormContext<Nimi>();
  // Local state for the input value
  const [value, setValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isValueValid, setIsValueValid] = useState(true);

  const logo = nimiLinkDetailsExtended[link].logo;
  // Handle the input change
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // Extract the value from the event
    const targetValue = event.target.value;
    setValue(targetValue);
    // Vlidate
    linkValidator
      .validate({
        type: link,
        content: targetValue,
      })
      .then((validatedLink: NimiLinkBaseDetails) => {
        console.log({ validatedLink }, 'shitter');
        handleFormValue(targetValue);
        setIsValueValid(true);
      })
      .catch(() => setIsValueValid(false));
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const targetValue = event.target.value;
    // Add the protocol if it's missing
    if (link == NimiLinkType.URL) {
      const isValueMissingProtocol = !targetValue.startsWith('http://') && !targetValue.startsWith('https://');
      const valueWithProtocol = isValueMissingProtocol ? `https://${targetValue}` : targetValue;
      const isValueWithProtocolValid = isURL(valueWithProtocol);

      if (isValueMissingProtocol && isValueWithProtocolValid) {
        setValue(valueWithProtocol);
        handleFormValue(valueWithProtocol);
        setIsValueValid(true);
      }
    }
    setIsInputFocused(false);
  };

  const handleFormValue = (newValue: string) => {
    const linksPrevState = getFormValues('links') || [];
    console.log('currentLink', link);
    console.log('linksPrevState', linksPrevState);

    linksPrevState[index] = { type: link, label, content: newValue };
    setFormValue('links', linksPrevState);
  };
  const handleDelete = () => {
    console.log('delete');
    const linksPrevState = getFormValues('links') || [];
    console.log('linksPrevState', linksPrevState);
    linksPrevState.splice(index, 1);
    console.log('index', index);

    setFormValue('links', linksPrevState);
  };

  /**
   * @todo - study the commented out code below and see if it can be used instead of the above -> Will do sensei
   */
  // useEffect(() => {
  //   const valuechange = getFormValues('links').find((prevLink) => prevLink.type === link);
  //   setValue(valuechange ? valuechange.content : value);
  // }, [getFormValues, link, value]);

  return (
    <>
      <Label htmlFor={link}>{label}</Label>
      <StyledInputWrapper isError={!isValueValid} isInputFocused={isInputFocused}>
        {logo && renderSVG(logo)}
        <StyledInput
          onFocus={() => setIsInputFocused(true)}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          placeholder={nimiLinkTypePlaceholder[link]}
          type="text"
          id={`nimi-link-input-${link}${index}`}
        />
      </StyledInputWrapper>
      <Button type="button" onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
}
