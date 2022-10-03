import { NimiThemeType } from '@nimi.io/card';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import Bogota from '../../assets/svg/bogota.svg';
import Nimi from '../../assets/svg/nimi-logo-no-text.svg';

const logos = {
  [NimiThemeType.DEVCON]: Bogota,
  [NimiThemeType.NIMI]: Nimi,
};
export function TemplatePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const { watch, setValue } = useFormContext();
  const { theme: CurrentTheme } = watch();
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (theme: NimiThemeType) => () => {
    //TODO: Connect with form
    setValue('theme', theme);
    setIsOpen(false);
    console.log('themeSelected', theme);
    console.log('currentTheme', CurrentTheme);
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        <img src={logos[CurrentTheme]} />
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {Object.values(NimiThemeType).map((theme, index) => (
              <ListItem onClick={onOptionClicked(theme)} key={index}>
                <img src={logos[theme]} />
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
