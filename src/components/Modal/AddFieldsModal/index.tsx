import styled from 'styled-components';
import { ModalMain } from '..';
import { NimiSignatureColor } from '../../../theme';
import { ButtonPrimary } from '../../Button';
import { Checkbox } from './Checkbox';
import { Fields } from '../../../constants';

const Header = styled.div`
  ${NimiSignatureColor};
  font-weight: 700;
  font-size: 42px;
`;
const UnderTitle = styled.div`
  color: #7a7696;
  /* font-family: 'Inter'; */
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
`;
const SocialsText = styled.div`
  /* font-family: Inter; */
  margin-top: 56px;
  font-size: 24px;
  font-weight: 600;
  color: rgba(78, 93, 120, 1);
  line-height: 29px;
  letter-spacing: 0px;
  text-align: left;
`;
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 23px;
  margin-top: 36px;
`;

export function AddFieldsModal(props) {
  const array = Object.values(Fields).filter((value) => typeof value === 'string');

  return (
    <ModalMain setModal={props.setModal} isOpen={props.isOpen}>
      <Header>Add fields</Header>
      <UnderTitle>
        Add the fields you want to be shown
        <br /> in your Nimi Profile.
      </UnderTitle>
      <SocialsText>Socials</SocialsText>

      <FormStyled onSubmit={props.handleSubmit}>
        {array.map((item, index) => (
          <Checkbox registerFields={props.registerFields} field={index} />
        ))}
        <ButtonPrimary type="submit">Add Fields</ButtonPrimary>
      </FormStyled>
    </ModalMain>
  );
}
