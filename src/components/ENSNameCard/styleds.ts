import styled from 'styled-components';
import { ExternalLink, NimiSignatureColor } from '../../theme';
import { Card } from '../Card';

export const StyledENSNameCardWrapper = styled(Card)`
  justify-content: center;
  align-items: center;
  padding: 48px 32px;
  max-width: 310px;
  min-height: 320px;
`;

export const ENSNameCardImage = styled.img`
  background-position: center, center;
  background-size: cover;
  margin-bottom: 15px;
  border-radius: 200px;
  height: 83px;
  width: 83px;
  z-index: 1;
`;

export const StyledDomainNameWrapper = styled.div`
  width: 100%;
  max-width: 200px;
  text-align: center;
`;

export const StyledExternalLink = styled(ExternalLink)`
  ${NimiSignatureColor};
  margin-top: 26px;
`;

export const StyledDomainName = styled.h2`
  ${NimiSignatureColor};
  font-size: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 32px;
  line-height: 100%;
`;
