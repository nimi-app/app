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
      <Body>
        <BodyControls>
          <BodyTitle>POAPs</BodyTitle>
          <BodyNavigation></BodyNavigation>
        </BodyControls>
      </Body>
    </Modal>
  );
}

const Modal = styled.div`
  width: 620px;
  padding: 32px;
  border-radius: 24px;
  background-color: white;

  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  position: relative;
  margin-bottom: 24px;
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

const Body = styled.main`
  width: 100%;
  padding: 36px;
  border-radius: 12px;
  background-color: #f1f2f5;
`;

const BodyControls = styled.div`
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: red;
`;

const BodyTitle = styled.h2`
  line-height: 26px;
  font-size: 26px;
  color: black;
`;

const BodyNavigation = styled.nav`
  height: 26px;
`;
