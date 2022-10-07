import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { ModalBase } from '../ModalBase';
import { TemplateItem } from './TemplateItem';

import nimiOGLogoImage from '../../../../assets/theme/nimi-og-logo-image.svg';
import nimiOGLogoText from '../../../../assets/theme/nimi-og-logo-text.svg';
import nimiOGPreview from '../../../../assets/theme/nimi-og-preview.png';

import devconLogoImage from '../../../../assets/theme/devcon-logo-image.svg';
import devconLogoText from '../../../../assets/theme/devcon-logo-text.svg';
import devconPreview from '../../../../assets/theme/devcon-preview.png';

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
        <TemplateItem themeImageLogo={nimiOGLogoImage} themeNameLogo={nimiOGLogoText} themePreview={nimiOGPreview} />
        <TemplateItem themeImageLogo={devconLogoImage} themeNameLogo={devconLogoText} themePreview={devconPreview} />
      </Container>
    </ModalBase>,
    modalContainer
  );
}

const Container = styled.div`
  width: 100%;
`;
