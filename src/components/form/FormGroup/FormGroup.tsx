import styled from 'styled-components';
import { NimiModalStyles } from '../../../theme';

export const FormWrapper = styled.form`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;
export const FormGroup = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  ${NimiModalStyles};
`;
