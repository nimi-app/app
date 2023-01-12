import { useAtom } from 'jotai';

import { modalOpenedAtom, ModalTypes, showSpinnerAtom } from '../state';

export function useUserInterface() {
  const [modalOpened, setModalOpened] = useAtom(modalOpenedAtom);
  const [isSpinnerShown, setIsSpinnerShown] = useAtom(showSpinnerAtom);

  const openModal = (modalType: keyof typeof ModalTypes) => setModalOpened(modalType);
  const closeModal = () => setModalOpened(null);

  const showSpinner = () => setIsSpinnerShown(true);
  const hideSpinner = () => setIsSpinnerShown(false);

  return {
    modalOpened,
    ModalTypes,
    openModal,
    closeModal,
    isSpinnerShown,
    showSpinner,
    hideSpinner,
  };
}
