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

export enum LinkState {
  IDLE,
  ACTIVE,
  ERROR,
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
  const [linkState, setLinkState] = useState<LinkState>();

  //TODO: handle focused and error values for links
  console.log('isInputFocues', isInputFocused);
  console.log('isValid', isValueValid);

  console.log('linkState', linkState);
  const logo = useMemo(() => {
    return renderSVG(nimiLinkDetailsExtended[link].logo, 20);
  }, [link]);

  useEffect(() => {
    //hook for handling input state
    if (!isValueValid && value.length !== 0) {
      const newTimeoutId = setTimeout(() => {
        setLinkState(LinkState.ERROR);
      }, 2222);
      if (isInputFocused) setLinkState(LinkState.ACTIVE);
      else setLinkState(LinkState.IDLE);
      return () => {
        clearTimeout(newTimeoutId);
      };
    } else if (isInputFocused) setLinkState(LinkState.ACTIVE);
    else return setLinkState(LinkState.IDLE);
  }, [isInputFocused, isValueValid, value]);

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

    setIsInputFocused(false);
    if (!isValueValid) setLinkState(LinkState.ERROR);
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
        state={linkState}
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
