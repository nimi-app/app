import { useState } from 'react';
import styled from 'styled-components';
import Bogota from '../../assets/svg/bogota.svg';
import Nimi from '../../assets/svg/nimi-logo-no-text.svg';

const options = ['BOGOTA', 'NIMI'];
const logos = {
  BOGOTA: Bogota,
  NIMI: Nimi,
};
export function TemplatePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('NIMI');

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    //TODO: Connect with form
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        <img src={logos[selectedOption]} />
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options.map((option, index) => (
              <ListItem onClick={onOptionClicked(option)} key={index}>
                <img src={logos[option]} />
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}

const DropDownContainer = styled.div`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled.div`
  background: #f0f3fb;
  border: 4.80392px solid #ffffff;
  box-shadow: 0px 14.4118px 38.4314px -9.45772px rgba(44, 43, 102, 0.14);
  border-radius: 12.6103px;
  padding: 24px;
  display: flex;
  justify-content: center;
`;

const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 1;
  box-shadow: 0px 14.4118px 38.4314px -9.45772px rgba(44, 43, 102, 0.14);
`;

const DropDownList = styled.div`
  background: #f0f3fb;
  border: 4.80392px solid #ffffff;
  box-shadow: 0px 14.4118px 38.4314px -9.45772px rgba(44, 43, 102, 0.14);
  border-radius: 12.6103px;
  padding: 24px;
`;

const ListItem = styled.div`
  list-style: none;
  margin-bottom: 0.8em;
`;
