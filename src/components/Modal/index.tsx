import { Property } from 'csstype';
import { PropsWithChildren } from 'react';
import ReactModal from 'react-modal';

// Import the the Modal components
import {
  StyledCloseModalButton,
  StyledModalBackdrop,
  StyledModalDialog,
  StyledModalInnerWrapper,
  StyledModalOutterWrapper,
} from './styled';
// Export the three main modal elements
export {
  StyledModalHeader as Header,
  StyledModalFooter as Footer,
  StyledModalContent as Content,
  StyledCloseModalButton as CloseButton,
  StyledModalTitle as Title,
  ModalSubTitle,
} from './styled';

const customStyles = {
  content: {
    padding: '82px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '24px',
    textAlign: 'center',
    maxWidth: '620px',
    height: 'fit-content',
  },
  overlay: { zIndex: 1000 },
};

interface ModalMainProps {
  isOpen: boolean;
  setModal: (state: boolean) => void;
  children: React.ReactNode;
}

export function ModalMain({ setModal, children, isOpen }: ModalMainProps) {
  return (
    <ReactModal onRequestClose={() => setModal(false)} style={customStyles} isOpen={isOpen}>
      <StyledCloseModalButton onClick={() => setModal(false)} />
      {children}
    </ReactModal>
  );
}

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
