import { Nimi, nimiLinkDetailsExtended, NimiLinkType, nimiLinkValidator } from '@nimi.io/card';
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

  const [isValueValid, setIsValueValid] = useState(true);

  //TODO: handle focused and error values for links

  const logo = useMemo(() => {
    return renderSVG(nimiLinkDetailsExtended[link].logo, 20);
  }, [link]);

  // Handle content change
  const onLinkChange = (value) => {
    setValue(value);
    // Vlidate
    nimiLinkValidator
      .isValid({
        type: link,
        content: value,
      })
      .then((isValidLink) => {
        if (isValidLink) handleFormValue(value);
        setIsValueValid(isValidLink);
      })
      .catch(() => {
        setIsValueValid(false);
      });
  };
  //handle title change
  const onTitleChange = (value) => {
    setTitle(value);

    const linksCurrentState = getFormValues('links') || [];

    linksCurrentState[index] = { type: link, title: value, content: linksCurrentState[index].content };
    setFormValue('links', linksCurrentState);
  };

  useEffect(() => {
    //handle index change for the title
    const linksCurrentState = getFormValues('links') || [];
    onTitleChange(linksCurrentState[index].title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, defaultTitle]);
  useEffect(() => {
    //handle index change for content
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
  };

  const handleFormValue = (newValue: string) => {
    const linksPrevState = getFormValues('links') || [];

    linksPrevState[index] = { type: link, title: linksPrevState[index].title, content: newValue };
    setFormValue('links', linksPrevState);
  };

  //Removes link from the form
  const handleDelete = () => {
    const linksPrevState = getFormValues('links') || [];

    linksPrevState.splice(index, 1);

    setFormValue('links', linksPrevState);
  };

  return (
    <LinkFieldWrapper>
      <TitleInput
        onTitleChange={onTitleChange}
        title={title}
        defaultTitle={t(`formLabel.${link.toLocaleLowerCase()}`)}
      />
      <InputFieldWithIcon
        isValid={isValueValid}
        logo={logo}
        placeholder={nimiLinkTypePlaceholder[link]}
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
