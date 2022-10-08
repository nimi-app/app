import styled from 'styled-components';
import { Flex } from 'rebass';

import { CardBody } from '../Card';
import { MEDIA_WIDTHS, NimiModalStyles, NimiSignatureColor } from '../../theme';
import { Button } from '../Button';
import { DottedButtonBase } from '../Button/styled';

/**
 * Defines the layout
 */
export const InnerWrapper = styled(Flex)`
  justify-content: center;
  gap: 24px;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    flex-wrap: wrap;
  }
`;

export const CardBodyTextCenter = styled(CardBody)`
  text-align: center;
`;

/**
 *
 */
export const FieldList = styled.div`
  display: flex;
  width: 100%;
  gap: 28px;
  flex-flow: row-wrap;
  flex-wrap: wrap;
`;

/**
 *
 * @param param0
 * @returns
 */
export const MainContent = styled.main<{ showMobile: boolean }>`
  max-width: 560px;
  flex: 1 0 100%;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    display: ${({ showMobile }) => (showMobile ? 'block' : 'none')};
  }
`;

/**
 * Preview Container
 * @param param0
 * @returns
 */
export const PreviewContent = styled.aside<{ showMobile: boolean }>`
  flex: 0 0 400px;
  max-width: 400px;

  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    height: 100vh;
    display: ${({ showMobile }) => (showMobile ? 'block' : 'none')};
    overflow: auto;
  }
`;

/**
 * Card title wrapper
 */
export const CardTitle = styled.div`
  ${NimiSignatureColor}
  font-size: 46px;
  line-height: 116%;
  text-align: start;
`;

export const StyledGridList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export const StyledFlexList = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const PageSectionTitle = styled.h1`
  ${NimiSignatureColor};
  font-size: 36px;
  line-height: 39px;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    text-align: center;
  }
`;
export const ProfileImage = styled.img`
  background-position: center, center;
  background-size: cover;
  border: 8px solid #ffffff;
  border-radius: 200px;
  height: 186px;
  width: 186px;
  z-index: 1;
  align-self: center;
`;

export const SaveAndDeployButton = styled(Button)`
  background: linear-gradient(291.35deg, #4368ea -25.85%, #c490dd 73.38%);
  opacity: 0.8;
  border-radius: 50px;
  padding: 25px 24px;
  letter-spacing: -0.02em;
  width: 100%;
`;
export const AddFieldsButton = styled(DottedButtonBase)`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.1em;
  border-radius: 12px;
  padding: 22px 16px;
  width: 100%;
`;
export const PreviewMobile = styled.div`
  display: none;
  flex: 1;
  ${NimiSignatureColor};
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  justify-content: center;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    display: flex;
  }
`;
export const BackButton = styled.button`
  display: none;
  padding: 12px 16px;
  color: #8e85e0;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  background-color: #ffffff;
  box-shadow: 0px 18px 32px -48px rgba(52, 55, 100, 0.06);
  border-radius: 90px;
  border: 1px solid #ffffff;
  margin: auto;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    display: flex;
  }
`;

export const StyledDots = styled.div`
  display: flex;
`;

export const LinkWrapper = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
`;

export const PoapButton = styled.div`
  display: flex;
  border: 2px solid #a78aff;
  border-radius: 12px;
  padding: 12px 36px 12px 8px;
  font-weight: 600;
  font-size: 16px;
  color: #a78aff;
  letter-spacing: 0.1em;
  line-height: 24px;
  justify-content: center;
  align-items: center;
  margin-bottom: 28px;
  gap: 12px;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;
export const ImportButton = styled.label`
  display: flex;
  position: relative;
  align-self: center;
  margin: 0 auto;
  margin: 22px 0;
  background: #4589ef;
  padding: 10px 24px;
  font-weight: 600;
  font-size: 16px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.02em;
  width: fit-content;
  opacity: 0.8;
  border-radius: 30px;
  color: #ffffff;
  cursor: pointer;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  :hover {
    transition-duration: 0.1s;
    background-color: #c9d1f1;
  }
  :after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 4em;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
    box-shadow: 0 0 10px 40px #a78aff;
  }
  :active:after {
    box-shadow: 0 0 0 0 white;
    position: absolute;
    border-radius: 4em;
    left: 0;
    top: 0;
    opacity: 1;
    transition: 0s;
  }
  :active {
    top: 1px;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  display: flex;
  justify-content: center;
  margin-top: 17px;
`;
export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;
export const BlockchainAddresses = styled.div`
  display: flex;
  gap: 14px;
  flex-direction: column;
`;

export const ProfilePictureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  flex-grow: 1;
  ${NimiModalStyles};
`;
export const Toplabel = styled.div`
  display: flex;
  margin-bottom: 16px;
  ${NimiSignatureColor};
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  /* identical to box height */
  letter-spacing: -0.02em;
`;

export const ImageAndTemplateSection = styled.div`
  display: flex;

  margin-bottom: 14px;
  gap: 14px;
`;
export const TemplateSection = styled.div`
  ${NimiModalStyles};
  margin-bottom: 14px;
`;
export const ImportSection = styled.div`
  ${NimiModalStyles};
`;
export const TemplateImportContainer = styled.div``;
