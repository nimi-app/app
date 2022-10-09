import { ReactNode, MouseEvent } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion/dist/framer-motion';

import { ReactComponent as CloseIcon } from '../../../assets/svg/close-icon.svg';
import { NimiSignatureColor } from '../../../theme';

type ModalProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  handleCloseModal: (event: MouseEvent) => void;
};

export function ModalBase({ children, title, subtitle, handleCloseModal }: ModalProps) {
  return (
    <Backdrop onClick={handleCloseModal}>
      <Modal
        initial={{ opacity: 0, scale: 0.5, y: '-100%' }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: '-100%' }}
      >
        <Header>
          <ModalTitle>{title}</ModalTitle>
          <ModalSubtitle>{subtitle}</ModalSubtitle>
          <CloseButton onClick={handleCloseModal} />
        </Header>
        <Body>{children}</Body>
      </Modal>
    </Backdrop>
  );
}

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  padding-top: 40px;
`;

const Modal = styled(motion.div)`
  max-width: 620px;
  padding: 32px;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0px 0 62px rgba(52, 55, 100, 0.15);
  margin: 0 auto;
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
`;
