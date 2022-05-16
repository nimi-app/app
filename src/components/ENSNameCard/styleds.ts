import { Flex } from 'rebass';
import styled from 'styled-components';
import { ExternalLink, NimiSignatureColor } from '../../theme';

// export const StyledENSNameCardWrapper = styled(WhiteCard)`
//   width: 337px;
//   height: 348px;
// `;

export const StyledENSNameCardWrapper = styled(Flex)`
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 5px 24px rgba(138, 143, 234, 0.12);
  backdrop-filter: blur(20px);
  flex-direction: column;
  border-radius: 25px;
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
