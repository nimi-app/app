import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { ModalBase } from '../ModalBase';
import { TemplateItem } from './TemplateItem';
import { Theme } from '../../../../types';

type TemplatePickerModalProps = {
  themes: Theme[];
  closeModal: () => void;
};

export function TemplatePickerModal({ closeModal, themes }: TemplatePickerModalProps) {
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
      title="Choose a Template"
      subtitle="Here is the selection of template you can choose from. To unlock more templates, collect POAPs and NFTs"
      handleCloseModal={closeModal}
    >
      <Container>
        {themes.map((theme) => (
          <TemplateItem key={theme.type} theme={theme} />
        ))}
      </Container>
    </ModalBase>,
    modalContainer
  );
}

const Container = styled.div`
  width: 100%;
`;
