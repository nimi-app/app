import { motion } from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import CloseIcon from '../../assets/svg/close-icon.svg';
import { NimiSignatureColor } from '../../theme';
// Import the the Modal components

// Export the three main modal elements
export {
  StyledModalHeader as Header,
  StyledModalFooter as Footer,
  StyledModalContent as Content,
  ModalTitleBig as Title,
} from './styled';

type ModalProps = {
  title?: string;
  subtitle?: string;
  maxWidth?: string;
  maxHeight?: string;
  handleCloseModal: () => void;
};

export function ModalBase({
  children,
  title,
  subtitle,
  handleCloseModal,
  maxWidth = '620px',
  maxHeight = '100%',
}: PropsWithChildren<ModalProps>) {
  const onClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
      handleCloseModal();
    }
  };
  return (
    <Backdrop onClick={onClose}>
      <Modal
        initial={{ opacity: 0, scale: 0.5, y: '-100%' }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: '-100%' }}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
      >
        <Header>
          {title && <ModalTitle>{title}</ModalTitle>}
          {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
          <CloseButton onClick={onClose} />
        </Header>
        <Body>{children}</Body>
      </Modal>
    </Backdrop>
  );
}

export function ModalPortal({
  children,
  title,
  subtitle,
  handleCloseModal,
  maxHeight,
  maxWidth,
}: PropsWithChildren<ModalProps>) {
  const [modalContainer] = useState(() => document.createElement('div'));

  useEffect(() => {
    modalContainer.classList.add('modal-root');
    document.body.appendChild(modalContainer);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeChild(modalContainer);
      document.body.style.overflow = 'auto';
    };
  }, [modalContainer]);

  return createPortal(
    <ModalBase
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      title={title}
      subtitle={subtitle}
      handleCloseModal={handleCloseModal}
    >
      {children}
    </ModalBase>,
    modalContainer
  );
}

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  padding-top: 40px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Modal = styled(motion.div)<{ maxWidth: string; maxHeight: string }>`
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};
  padding: 32px;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0px 0 62px rgba(52, 55, 100, 0.15);
  margin: 0 auto;
  overflow: auto;
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
