import styled from 'styled-components';
import { Flex } from 'rebass';

import { ExternalLink, NimiSignatureColor } from '../../theme';
import { Button } from '../Button';

export const CardWrapper = styled(Flex)`
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 5px 24px rgba(138, 143, 234, 0.12);
  backdrop-filter: blur(20px);
  width: 337px;
  height: 348px;
  flex-direction: column;
  border-radius: 25px;
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

export const StyledButton = styled(Button)`
  margin-top: auto;
`;

export const StyledExternalLink = styled(ExternalLink)`
  ${NimiSignatureColor};
  margin-top: 26px;
`;
