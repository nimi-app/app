import { Property } from 'csstype';
import styled from 'styled-components';

import { NimiSignatureColor } from '../../theme';

/**
 * Modal inner components default padding
 */
export const DEFAULT_INNER_COMPONENT_SPACING: Property.Padding = '24px';
/**
 * Modal component default width
 */
export const MODAL_MAX_WIDTH: Property.MaxWidth = '500px';

/**
 * Defines the base styles for the modal's inner component.
 */
export interface ModalInnerComponentProps {
  padding?: Property.Padding;
}

export interface StyledModalOutterWrapperProps {
  maxWidth?: Property.MaxWidth;
}

export const StyledModalHeader = styled.header<ModalInnerComponentProps>(
  ({ padding = DEFAULT_INNER_COMPONENT_SPACING }) => `
  font-weight: 500;
  font-size: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px 28px 20px;
  padding: ${padding};
  position: relative;
`
);

export const StyledModalFooter = styled.footer<ModalInnerComponentProps>(
  ({ padding = DEFAULT_INNER_COMPONENT_SPACING }) => `
  font-size: 15px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #6f6e84;
  padding: 0px 28px 20px;
  padding: ${padding};
`
);

export const StyledModalContent = styled.main<ModalInnerComponentProps>(
  ({ padding = DEFAULT_INNER_COMPONENT_SPACING }) => `
    padding: ${padding};
`
);

/**
 * Modal Title
 */
export const ModalTitleBig = styled.div`
  font-weight: 700;
  font-size: 38px;
  ${NimiSignatureColor};
`;
