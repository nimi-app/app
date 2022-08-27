import { Nimi, NimiLinkBaseDetails, NimiLinkType, links, nimiLinkDetailsExtended } from 'nimi-card';
import isURL from 'validator/lib/isURL';

import { useFormContext } from 'react-hook-form';
import { ChangeEventHandler, FocusEventHandler, useState } from 'react';

import { StyledInputWrapper, LinkFieldWrapper, StyledInput, TrashCanStyle, StyledCross } from './NimiLinkField.styled';
import { renderSVG } from '../../../../utils';

import { ReactComponent as TrashCan } from '../../../../assets/svg/trashcan.svg';
import { TitleInput } from './TitleInput';
import { nimiLinkTypePlaceholder } from '../../../../constants';

export interface NimiLinkFieldProps {
  link: NimiLinkType;
  title: string;
  index: number;
  key: string;
  content: string;
}

/**
 * Handles the input for the link type
 */
export function NimiLinkField({ link, title: defaultTitle, index, content: defaultContent }: NimiLinkFieldProps) {
  // Form context
  const { setValue: setFormValue, getValues: getFormValues } = useFormContext<Nimi>();
  // Local state for the input value
  const [value, setValue] = useState(defaultContent);
  const [title, setTitle] = useState(defaultTitle);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isValueValid, setIsValueValid] = useState(true);

  const logo = nimiLinkDetailsExtended[link].logo;
  // Handle the input change
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // Extract the value from the event
    const targetValue = event.target.value;
    setValue(targetValue);
    // Vlidate
    links
      .isValid({
        type: link,
        content: targetValue,
      })
      .then((isGut) => {
        console.log({ value });
        console.log('isValidShit', isGut);
        if (isGut) handleFormValue(targetValue);

        setIsValueValid(isGut);
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

    linksPrevState[index] = { type: link, title, content: newValue };
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
    <LinkFieldWrapper>
      <TitleInput setTitle={setTitle} title={title} defaultTitle={defaultTitle} index={index} />
      <StyledInputWrapper>
        {logo && renderSVG(logo, 20)}
        <StyledInput
          onFocus={() => setIsInputFocused(true)}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          placeholder={nimiLinkTypePlaceholder[link]}
          type="text"
          id={`nimi-link-input-${link}${index}`}
        />
        {value.length > 0 && <StyledCross onClick={() => setValue('')} />}
        <TrashCanStyle onClick={handleDelete}>
          <TrashCan />
        </TrashCanStyle>
      </StyledInputWrapper>
    </LinkFieldWrapper>
  );
}
