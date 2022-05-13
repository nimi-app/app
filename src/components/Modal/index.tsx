// interface PreviewProps {
//   fieldsArray: any;
// }
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

export function ModalMain(props) {
  return (
    <Modal onRequestClose={() => props.setModal(false)} style={customStyles} isOpen={props.isOpen}>
      <CloseIcon
        onClick={() => {
          props.setModal(false);
        }}
      />
      {props.children}
    </Modal>
  );
}
