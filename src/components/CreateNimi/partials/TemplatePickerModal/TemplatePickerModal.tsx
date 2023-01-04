import { ThemeAssets } from '../../../../types';
import { ModalPortal } from '../../../Modal';
import { TemplateItem } from './TemplateItem';

interface TemplatePickerModalProps {
  themes: ThemeAssets[];
  handleThemeSelection: (theme: ThemeAssets) => void;
  closeModal: () => void;
}

export function TemplatePickerModal({ closeModal, handleThemeSelection, themes }: TemplatePickerModalProps) {
  return (
    <ModalPortal
      title="Choose a Template"
      subtitle="Here is the selection of template you can choose from. To unlock more templates, collect POAPs and NFTs"
      handleCloseModal={closeModal}
    >
      {themes.map((theme, index) => (
        <TemplateItem
          key={theme.type}
          theme={theme}
          onClick={() => handleThemeSelection(theme)}
          noMargin={index + 1 === themes.length}
        />
      ))}
    </ModalPortal>
  );
}
