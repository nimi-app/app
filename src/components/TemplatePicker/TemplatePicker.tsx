import { NimiThemeType } from '@nimi.io/card';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ReactComponent as BogotaSvg } from '../../assets/svg/bogota.svg';
import { ReactComponent as NimiSvg } from '../../assets/svg/nimi-logo-no-text.svg';

const logos = {
  [NimiThemeType.DEVCON]: BogotaSvg,
  [NimiThemeType.NIMI]: NimiSvg,
};

export function TemplatePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const { watch, setValue } = useFormContext();
  const { theme: CurrentTheme } = watch();
  const toggleIsOpen = () => setIsOpen((value) => !value);

  const onOptionClicked = (theme: NimiThemeType) => () => {
    setValue('theme', { type: theme });
    setIsOpen(false);
  };

  const CurrentLogo = logos[CurrentTheme.type];

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggleIsOpen}>
        <CurrentLogo />
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {Object.values(NimiThemeType).map((theme, index) => {
              const Logo = logos[theme];
              return (
                <ListItem onClick={onOptionClicked(theme)} key={index + theme}>
                  <Logo />
                </ListItem>
              );
            })}
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
  align-items: center;
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
