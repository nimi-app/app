import { Nimi, NimiLinkType, nimiLinkValidator, nimiLinkDetailsExtended } from 'nimi-card';
import isURL from 'validator/lib/isURL';

import { useFormContext } from 'react-hook-form';
import { FocusEventHandler, useEffect, useMemo, useState } from 'react';

import { LinkFieldWrapper } from './NimiLinkField.styled';
import { renderSVG } from '../../../../utils';

import { nimiLinkTypePlaceholder } from '../../../../constants';
import { InputFieldWithIcon } from '../../../Input';
import { useTranslation } from 'react-i18next';
import { TitleInput } from './TitleInput';

export interface NimiLinkFieldProps {
  link: NimiLinkType;
  title?: string;
  index: number;
  key: string;
  content: string;
}

/**
 * Handles the input for the link type
 */
export function NimiLinkField({ link, index, content: defaultContent, title: defaultTitle }: NimiLinkFieldProps) {
  const { t } = useTranslation('nimi');
  // Form context
  const { setValue: setFormValue, getValues: getFormValues } = useFormContext<Nimi>();
  // Local state for the input value
  const [value, setValue] = useState(defaultContent);
  const [title, setTitle] = useState(defaultTitle);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isValueValid, setIsValueValid] = useState(true);
  console.log('isInputFocues', isInputFocused);
  console.log('isValid', isValueValid);
  const logo = useMemo(() => {
    return renderSVG(nimiLinkDetailsExtended[link].logo, 20);
  }, [link]);
  // Handle the input change
  const onLinkChange = (event) => {
    // Extract the value from the event
    const targetValue = event;
    setValue(targetValue);
    // Vlidate
    nimiLinkValidator
      .isValid({
        type: link,
        content: targetValue,
      })
      .then((isGut) => {
        if (isGut) handleFormValue(targetValue);

        setIsValueValid(isGut);
      })
      .catch(() => setIsValueValid(false));
  };

  const onTitleChange = (event) => {
    // Extract the value from the event
    const targetValue = event;
    setTitle(targetValue);
    console.log('setting', targetValue);
    // Vlidate

    const linksPrevState = getFormValues('links') || [];

    linksPrevState[index] = { type: link, title: targetValue, content: value };
    setFormValue('links', linksPrevState);
  };

  useEffect(() => {
    const linksPrevState = getFormValues('links') || [];
    onTitleChange(linksPrevState[index].title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, defaultTitle]);
  useEffect(() => {
    //handle index change
    // onLinkChange(defaultContent);
    onLinkChange(defaultContent);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, defaultContent]);

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

    linksPrevState[index] = { type: link, title: linksPrevState[index].title, content: newValue };
    setFormValue('links', linksPrevState);
  };
  const handleDelete = () => {
    const linksPrevState = getFormValues('links') || [];

    linksPrevState.splice(index, 1);

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
      <TitleInput
        onTitleChange={onTitleChange}
        title={title}
        defaultTitle={t(`formLabel.${link.toLocaleLowerCase()}`)}
      />
      <InputFieldWithIcon
        logo={logo}
        placeholder={nimiLinkTypePlaceholder[link]}
        onInputFocus={() => setIsInputFocused(true)}
        onBlur={onBlur}
        onChange={(event) => onLinkChange(event.target.value)}
        value={value}
        onDelete={handleDelete}
        onInputReset={() => setValue('')}
        id={`nimi-link-input-${link}${index}`}
      />
    </LinkFieldWrapper>
  );
}
