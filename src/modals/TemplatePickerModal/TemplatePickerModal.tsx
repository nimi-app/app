import { useFormContext } from 'react-hook-form';

import { Modal } from '../../components/Modal';
import { ThemeAssets } from '../../types';
import { TemplateItem } from './TemplateItem';

interface TemplatePickerModalProps {
  themes: ThemeAssets[];
  closeModal: () => void;
}

export function TemplatePickerModal({ closeModal, themes }: TemplatePickerModalProps) {
  const { setValue } = useFormContext();

  const handleThemeSelection = (theme: ThemeAssets) => {
    setValue('theme', { type: theme.type });
    closeModal();
  };

  return (
    <Modal
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
    </Modal>
  );
}
