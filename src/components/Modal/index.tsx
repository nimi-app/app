import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { ReactComponent as CloseIcon } from '../../assets/svg/close-icon.svg';
// Import the the Modal components
import { StyledModalBackdrop, StyledModalDialog, StyledModalInnerWrapper, StyledModalOutterWrapper } from './styled';
// Export the three main modal elements
export { StyledModalHeader as Header, StyledModalFooter as Footer, StyledModalContent as Content } from './styled';

const customStyles = {
  content: {
    padding: '82px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '24px',
    textAlign: 'center',
    width: 'fit-content',
    height: 'fit-content',
  },
  overlay: { zIndex: 1000 },
};

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 41px;
  right: 45px;
  cursor: pointer;
`;

interface ModalMainProps {
  isOpen: boolean;
  setModal: (state: boolean) => void;
  children: React.ReactNode;
}

export function ModalMain({ setModal, children, isOpen }: ModalMainProps) {
  return (
    <ReactModal onRequestClose={() => setModal(false)} style={customStyles} isOpen={isOpen}>
      <StyledCloseIcon onClick={() => setModal(false)} />
      {children}
    </ReactModal>
  );
}

/**
 * Modal main component. This is the main component that is used to render the modal.
 */
export function Modal({ children }: PropsWithChildren<unknown>) {
  return (
    <StyledModalDialog>
      <StyledModalBackdrop>
        <StyledModalOutterWrapper>
          <StyledModalInnerWrapper>{children}</StyledModalInnerWrapper>
        </StyledModalOutterWrapper>
      </StyledModalBackdrop>
    </StyledModalDialog>
  );
}
