import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { ModalBase } from '../ModalBase';
import { TemplateItem } from './TemplateItem';
import NimiLogo from '../../../../assets/svg/nimi-logo-no-text.svg';
import NimiOG from '../../../../assets/svg/nimi-og.svg';
import devconImageLogo from '../../../../assets/svg/devcon-image-logo.svg';
import DevconLogoText from '../../../../assets/svg/devcon-text.svg';

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
      <Container>
        <TemplateItem themeImageLogo={NimiLogo} themeNameLogo={NimiOG} />
        <TemplateItem themeImageLogo={devconImageLogo} themeNameLogo={DevconLogoText} />
      </Container>
    </ModalBase>,
    modalContainer
  );
}

const Container = styled.div`
  width: 100%;
`;
