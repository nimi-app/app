import styled from 'styled-components';
import { Flex } from 'rebass';

import { Card as CardBase, CardBody } from '../Card';
import { NimiSignatureColor } from '../../theme';
import { ReactComponent as PlaceholderMini } from '../../assets/svg/profile-empty.svg';
import { Button } from '../Button';

/**
 * Defines the layout
 */
export const InnerWrapper = styled(Flex)`
  justify-content: center;
  gap: 24px;
`;

/**
 * Add some margin to the card
 */
export const Card = styled(CardBase)`
  margin-bottom: 24px;
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
export const MainContent = styled.main`
  max-width: 560px;
  flex: 1 0 100%;
`;

/**
 * Preview Container
 * @param param0
 * @returns
 */
export const PreviewContent = styled.aside`
  flex: 0 0 400px;
  max-width: 400px;
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

export const PageSectionTitle = styled.h1`
  ${NimiSignatureColor}
  font-size: 36px;
  line-height: 39px;
  letter-spacing: -0.02em;
`;
export const ProfileImage = styled.img`
  background-position: center, center;
  background-size: cover;
  align-self: center;
  border: 8px solid #ffffff;
  border-radius: 200px;
  height: 209.8px;
  width: 209.8px;
  z-index: 1;
`;
export const ProfileImagePlaceholder = styled(PlaceholderMini)`
  align-self: center;
`;
export const SaveAndDeployButton = styled(Button)`
  background: linear-gradient(291.35deg, #4368ea -25.85%, #c490dd 73.38%);
  opacity: 0.8;
  border-radius: 50px;
  padding: 25px 24px;
  letter-spacing: -0.02em;
`;
export const AddFieldsButton = styled.button`
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.1em;
  ${NimiSignatureColor};
  border: 2px dotted rgba(67, 104, 234, 1);
  padding: 22px 16px;
  border-radius: 12px;
`;
