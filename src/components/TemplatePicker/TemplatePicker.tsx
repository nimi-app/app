// import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ReactComponent as Bogota } from '../../assets/svg/bogota.svg';
import { ReactComponent as Nimi } from '../../assets/svg/nimi-logo-no-text.svg';

enum Themes {
  NIMI = 'Nimi',
  BOGOTA = 'Bogota',
}

const logos = {
  Bogota: Bogota,
  Nimi: Nimi,
};
const StyledSelect = styled.select`
  background: #f0f3fb;
  border: 4.80392px solid #ffffff;
  box-shadow: 0px 14.4118px 38.4314px -9.45772px rgba(44, 43, 102, 0.14);
  border-radius: 12.6103px;
`;

export function TemplatePicker() {
  //   const { register } = useFormContext();
  return (
    <Container>
      <StyledSelect>
        {Object.keys(Themes).map((item, index) => {
          return (
            <option value={item} key={index}>
              <img src={logos[item]} />
            </option>
          );
        })}
      </StyledSelect>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;
