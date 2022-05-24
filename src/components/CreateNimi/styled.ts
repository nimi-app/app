import styled from 'styled-components';
import { Flex } from 'rebass';

import { Card as CardBase, CardBody } from '../Card';

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
