import { Property } from 'csstype';
import { PropsWithChildren } from 'react';

// Import the the Modal components
import { StyledModalBackdrop, StyledModalDialog, StyledModalInnerWrapper, StyledModalOutterWrapper } from './styled';
// Export the three main modal elements
export {
  StyledModalHeader as Header,
  StyledModalFooter as Footer,
  StyledModalContent as Content,
  StyledCloseModalButton as CloseButton,
  StyledModalTitle as Title,
  ModalSubTitle,
} from './styled';

export interface ModalProps {
  maxWidth?: Property.MaxWidth;
}

/**
 * Modal main component. This is the main component that is used to render the modal.
 */
export function Modal({ children, maxWidth }: PropsWithChildren<ModalProps>) {
  return (
    <StyledModalDialog>
      <StyledModalBackdrop>
        <StyledModalOutterWrapper maxWidth={maxWidth}>
          <StyledModalInnerWrapper>{children}</StyledModalInnerWrapper>
        </StyledModalOutterWrapper>
      </StyledModalBackdrop>
    </StyledModalDialog>
  );
}
