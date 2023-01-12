import { useAtom } from 'jotai';

import { modalOpenedAtom, ModalTypes } from '../state';

export function useUserInterface() {
  const [modalOpened, setModalOpened] = useAtom(modalOpenedAtom);

  const openModal = (modalType: keyof typeof ModalTypes) => setModalOpened(modalType);
  const closeModal = () => setModalOpened(null);

  return {
    modalOpened,
    ModalTypes,
    openModal,
    closeModal,
  };
}
