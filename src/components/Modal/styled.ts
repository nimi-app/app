import styled, { keyframes } from 'styled-components';
import { Property } from 'csstype';
import { ReactComponent as CloseIcon } from '../../assets/svg/close-icon.svg';
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

export const StyledModalDialog = styled.div`
  scrollbar-width: none;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: auto;
  z-index: 989;
`;

export const animation = keyframes`
  0% {
    background-color: rgba(11, 11, 19, 0)
  }

  to {
    @-moz-document url-prefix() {
      background-color: rgba(11, 11, 19, .4)
    }

    -webkit-backdrop-filter:blur(6px);
    backdrop-filter:blur(6px)
  }
}`;

export const StyledModalBackdrop = styled.div`
  backdrop-filter: blur(6px);
  animation: ${animation} 0.25s ease-in-out;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export interface StyledModalOutterWrapperProps {
  maxWidth?: Property.MaxWidth;
}

/**
 * Outter container/component for the modal.
 */
export const StyledModalOutterWrapper = styled.div<StyledModalOutterWrapperProps>(
  ({ maxWidth = MODAL_MAX_WIDTH }) => `
  margin: auto;
  z-index: 1000;
  width: 100%;
  max-width: ${maxWidth};
  padding-left: 16px;
  padding-right: 16px;
`
);

export const StyledModalInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  margin: auto;
`;

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

export const StyledCloseModalButton = styled(CloseIcon)`
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
`;

/**
 * Modal Title
 */
export const StyledModalTitle = styled.h2`
  ${NimiSignatureColor}
`;
