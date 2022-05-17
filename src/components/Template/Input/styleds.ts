import styled from 'styled-components';
import { NimiSignatureColor, WhiteCard } from '../../../theme';
import { Button } from '../../Button';

export const StyledCard = styled(WhiteCard)`
  padding: 42px;
  display: flex;
  max-width: 560px;
`;
export const TitleText = styled.div`
  ${NimiSignatureColor}
  font-size: 46px;
  line-height: 116%;

  text-align: start;
`;
export const NameTag = styled.span`
  text-transform: capitalize;
  font-weight: 700;
`;
export const StyledButton = styled(Button)`
  margin-top: 42px;
  margin-bottom: 28px;
  background: #56ccf2;
  box-shadow: 0px 10px 32px -48px rgba(52, 55, 100, 0.08);
  border-radius: 30px !important;
  padding: 10px 24px;
`;
export const AddField = styled.button`
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;
  margin-top: 28px;
  ${NimiSignatureColor};
  border: 2px dotted rgba(67, 104, 234, 1);
`;
export const StyledButtonPrimary = styled(Button)`
  width: 100%;
  margin-top: 32px;
`;
