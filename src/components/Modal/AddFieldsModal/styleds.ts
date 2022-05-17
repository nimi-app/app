import { NimiSignatureColor } from '../../../theme';
import styled from 'styled-components';

export const Header = styled.div`
  ${NimiSignatureColor};
  font-weight: 700;
  font-size: 42px;
`;
export const UnderTitle = styled.div`
  color: #7a7696;
  /* font-family: 'Inter'; */
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
`;
export const SocialsText = styled.div`
  /* font-family: Inter; */
  margin-top: 56px;
  font-size: 24px;
  font-weight: 600;
  color: rgba(78, 93, 120, 1);
  line-height: 29px;
  letter-spacing: 0px;
  text-align: left;
`;
export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 23px;
  margin-top: 36px;
`;
