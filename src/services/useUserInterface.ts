import { useSetAtom } from 'jotai';

import { modalOpenedAtom, ModalTypes } from '../state';

export function useUserInterface() {
  const setModalOpened = useSetAtom(modalOpenedAtom);

  const openImportFromTwitterModal = () => setModalOpened(ModalTypes.IMPORT_FROM_TWITTER);
  const openImportFromLinkTreeModal = () => setModalOpened(ModalTypes.IMPORT_FROM_LINKTREE);
  const openNFTSelectorModal = () => setModalOpened(ModalTypes.NFT_SELECTOR);
  const openAddFieldsModal = () => setModalOpened(ModalTypes.ADD_FIELDS);
  const openConfigurePOAPsModal = () => setModalOpened(ModalTypes.CONFIGURE_POAPS);
  const openTemplatePickerModal = () => setModalOpened(ModalTypes.TEMPLATE_PICKER);
  const openPublishNimiModal = () => setModalOpened(ModalTypes.PUBLISH_NIMI);
  const openModal = (modalType: keyof typeof ModalTypes) => setModalOpened(modalType);
  const closeModal = () => setModalOpened(null);

  return {
    openImportFromTwitterModal,
    openImportFromLinkTreeModal,
    openNFTSelectorModal,
    openAddFieldsModal,
    openConfigurePOAPsModal,
    openTemplatePickerModal,
    openPublishNimiModal,
    openModal,
    closeModal,
  };
}
