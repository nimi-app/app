import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActiveWeb3React } from '../../hooks/useWeb3';
import { AppDispatch, AppState } from '../index';
import { ApplicationModal, setOpenModal } from './actions';

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useSelector((state: AppState) => state.application.openModal);
  return openModal === modal;
}
export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();

  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1]);
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open]);
}

export function useOpenModal(modal: ApplicationModal): () => void {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal]);
}

export function useCloseModals(): () => void {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setOpenModal(null)), [dispatch]);
}

export function useNetworkSwitcherPopoverToggle(): () => void {
  return useToggleModal(ApplicationModal.NETWORK_SWITCHER);
}

export function useWalletSwitcherPopoverToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET_SWITCHER);
}

export function useEthereumOptionPopoverToggle(): () => void {
  return useToggleModal(ApplicationModal.ETHEREUM_OPTION);
}
