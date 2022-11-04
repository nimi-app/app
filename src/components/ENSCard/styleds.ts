import styled from 'styled-components';

import { ExternalLink, NimiSignatureColor } from '../../theme';
import { Card } from '../Card';

export const StyledENSNameCardWrapper = styled(Card)`
  justify-content: center;
  align-items: center;
  padding-top: 42px;
  flex-direction: row;
  padding-bottom: 42px;
  width: 308px;
  cursor: pointer;
  height: 146px;
  overflow: hidden;
`;

export const ENSNameCardImage = styled.img`
  background-position: center center;
  background-size: cover;
  border-radius: 200px;
  height: 83px;
  width: 83px;
  z-index: 1;
  box-shadow: 0px 5px 24px rgba(138, 143, 234, 0.12);
  backdrop-filter: blur(20px);
`;

export const StyledExternalLink = styled(ExternalLink)`
  ${NimiSignatureColor};
  margin-top: 26px;
`;
export const StyledDomainNameWrapper = styled.div`
  margin-left: 16px;
  text-align: start;
`;

export const StyledDomainName = styled.div`
  ${NimiSignatureColor};
  font-size: 24px;
  overflow: hidden;
  line-height: 26px;
  white-space: wrap;
  margin-left: 16px;
  text-align: start;
  text-overflow: ellipsis;
  line-height: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;
