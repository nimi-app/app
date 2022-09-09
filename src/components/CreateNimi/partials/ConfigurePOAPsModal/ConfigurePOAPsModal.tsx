import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../../../../assets/svg/close-icon.svg';
import { NimiSignatureColor } from '../../../../theme';

export function ConfigurePOAPsModal() {
  return (
    <Modal>
      <Header>
        <ModalTitle>Configure POAPs</ModalTitle>
        <ModalSubtitle>Add your POAPs in the order you want to showcase them.</ModalSubtitle>
        <CloseButton />
      </Header>
    </Modal>
  );
}

const Modal = styled.div`
  width: 620px;
  height: 400px;
  padding: 32px;
  border-radius: 24px;
  background-color: white;

  background-color: yellow;
`;

const Header = styled.div`
  position: relative;
`;

const ModalTitle = styled.h1`
  line-height: 28px;
  font-size: 28px;
  ${NimiSignatureColor}
  margin-bottom: 16px;
`;

const ModalSubtitle = styled.p`
  line-height: 15px;
  font-size: 14px;
  color: #7a7696;
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;
