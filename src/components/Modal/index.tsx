// interface PreviewProps {
//   fieldsArray: any;
// }
import Modal from 'react-modal';
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
      {props.children}
    </Modal>
  );
}
