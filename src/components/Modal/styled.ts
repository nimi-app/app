import { Property } from 'csstype';
import { styled } from 'styled-components';

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

export const StyledModalHeader = styled.header<{ padding?: string }>`
  gap: 32px;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${({ padding }) => padding};
  padding-bottom: 0;
`;

StyledModalHeader.defaultProps = {
  padding: DEFAULT_INNER_COMPONENT_SPACING,
};

export const StyledModalFooter = styled.footer<{ padding?: string }>`
  font-size: 15px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6f6e84;
  padding: 0px 28px 20px;
  padding: ${({ padding }) => padding};
  padding-top: 0;
`;
StyledModalFooter.defaultProps = {
  padding: DEFAULT_INNER_COMPONENT_SPACING,
};

export const StyledModalContent = styled.main<{ padding?: string }>`
  padding: ${({ padding }) => padding};
`;
StyledModalContent.defaultProps = {
  padding: DEFAULT_INNER_COMPONENT_SPACING,
};

/**
 * Modal Title
 */
export const ModalTitleBig = styled.div`
  font-weight: 700;
  font-size: 38px;
  ${NimiSignatureColor};
`;
