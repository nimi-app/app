import styled from 'styled-components';
import checkmark from '../../../../assets/svg/checkmark.svg';
import { Fields } from '..';
const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;
const StyledLabel = styled.div`
  margin-left: 14px;
  color: #8a94a6;
  font-weight: 500;
  font-size: 18px;
  line-height: 29px;
`;
const StyledCheckbox = styled.input`
  border-radius: 8px;
  width: 28px;
  height: 28px;
  background-image: url(${checkmark});
  background-color: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
`;
const FieldsMapping = {
  [Fields.TWITTER]: { name: 'Twitter' },
  [Fields.TELEGRAM]: { name: 'Telegram' },
  [Fields.INSTAGRAM]: { name: 'Instagram' },
  [Fields.LINKEDIN]: { name: 'LinkedIn' },
  [Fields.EMAIL]: { name: 'Email' },
  [Fields.WEBSITE]: { name: 'Website' },
};
export function Checkbox(props) {
  return (
    <Wrapper>
      <StyledCheckbox type="checkbox" {...props.registerFields(FieldsMapping[props.field].name)}></StyledCheckbox>
      <StyledLabel>{FieldsMapping[props.field].name}</StyledLabel>
    </Wrapper>
  );
}
