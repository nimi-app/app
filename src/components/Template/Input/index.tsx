import { useFormContext } from 'react-hook-form';

import { FieldType } from '../../../constants';

import { InputForm } from './InputForm';
import { ProfilePic } from './ProfilePic';
import { StyledCard, TitleText, StyledButton, AddField, NameTag, StyledButtonPrimary } from './styleds';

interface InputProps {
  setModalState: (state: boolean) => void;
  ensName: string | undefined;
  inputFields: FieldType[];
}
export function Input({ setModalState, ensName, inputFields }: InputProps) {
  const { handleSubmit } = useFormContext();
  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);

  return (
    <StyledCard as="form" onSubmit={handleSubmit(onSubmit, onError)}>
      <TitleText>
        Creating <NameTag>{ensName?.split('.')[0]}&apos;s</NameTag> Personal Nimi site.
      </TitleText>
      <ProfilePic />
      <StyledButton>Import Data from Twitter</StyledButton>
      <InputForm inputFields={inputFields} />
      <AddField onClick={() => setModalState(true)}>+ ADD FIELDS</AddField>
      <StyledButtonPrimary type="submit">Save &amp; Deploy Nimi Site </StyledButtonPrimary>
    </StyledCard>
  );
}
