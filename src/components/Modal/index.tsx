import { ReactComponent as CloseIcon } from '../../assets/svg/close-icon.svg';
import Modal from 'react-modal';
import styled from 'styled-components';
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
  display: flex;
  margin-left: auto;
`;
interface ModalMainProps {
  isOpen: boolean;
  setModal: (state: boolean) => void;
  children: React.ReactNode;
}
export function ModalMain({ setModal, children, isOpen }: ModalMainProps) {
  return (
    <Modal onRequestClose={() => setModal(false)} style={customStyles} isOpen={isOpen}>
      <StyledCloseIcon
        onClick={() => {
          setModal(false);
        }}
      />
      {children}
    </Modal>
  );
}
