import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalBase } from '../ModalBase';

export function TemplatePickerModal() {
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
      handleCloseModal={() => console.log('CLOSE MODAL')}
    >
      <div>123</div>
    </ModalBase>,
    modalContainer
  );
}
