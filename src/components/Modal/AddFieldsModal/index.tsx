import { ModalMain } from '..';
import { Button } from '../../Button';
import { Checkbox } from './Checkbox';
import { Fields } from '../../../constants';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Header, UnderTitle, SocialsText, FormStyled } from './styleds';

interface AddFieldsModalProps {
  handleSubmit: (data: any) => void;
  registerFields: UseFormRegister<FieldValues>;
  setModal: (state: boolean) => void;
  isOpen: boolean;
}

export function AddFieldsModal({ handleSubmit, registerFields, setModal, isOpen }: AddFieldsModalProps) {
  //makes an array out of enum Fields so we can interate over the fields
  const array = Object.values(Fields).filter((value) => typeof value === 'string');
  console.log(array);

  return (
    <ModalMain setModal={setModal} isOpen={isOpen}>
      <Header>Add fields</Header>
      <UnderTitle>
        Add the fields you want to be shown
        <br /> in your Nimi Profile.
      </UnderTitle>
      <SocialsText>Socials</SocialsText>

      <FormStyled onSubmit={handleSubmit}>
        {array.map((item, index) => (
          <Checkbox key={index} registerFields={registerFields} field={item} />
        ))}
        <Button type="submit">Add Fields</Button>
      </FormStyled>
    </ModalMain>
  );
}
