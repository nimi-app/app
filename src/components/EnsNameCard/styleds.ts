import styled from 'styled-components';
import { ExternalLink, NimiSignatureColor, WhiteCard } from '../../theme';
import { ButtonPrimary } from '../Button';

export const CardWrapper = styled(WhiteCard)`
  width: 337px;
  height: 348px;
  padding: 48px 32px;
`;
export const ProfilePic = styled.img`
  background-position: center, center;
  background-size: cover;

  border-radius: 200px;
  height: 83px;
  width: 83px;
  z-index: 1;
`;
export const DomainText = styled.div`
  ${NimiSignatureColor};
  margin-top: auto;
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 100%;
`;
export const StyledButton = styled(ButtonPrimary)`
  margin-top: auto;
`;

export const StyledExternalLink = styled(ExternalLink)`
  ${NimiSignatureColor};
  margin-top: 26px;
`;
