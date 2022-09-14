import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';

import { ModalBase } from '../ModalBase';
import { NimiPOAPWidget } from '@nimi.io/card';

import { BodyNavigation, PreloaderPOAPs, RecentPOAPs, CustomizePOAPs } from './components';
import { POAPToken } from './types';

import { useConfigurePOAPsModal } from './useConfigurePOAPsModal';

type ConfigurePOAPsModalProps = {
  ensAddress: string;
  widget: NimiPOAPWidget;
  closeModal: () => void;
};

export function ConfigurePOAPsModal({ ensAddress, widget, closeModal }: ConfigurePOAPsModalProps) {
  const {
    modalContainer,
    page,
    openRecentPage,
    openCustomPage,
    items,
    setItems,
    fetchingItems,
    setFetchingItems,
    selectedItems,
    handleReordering,
    addPOAPToSelectedItems,
    removePOAPFromSelectedItems,
    clearSelectedItems,
  } = useConfigurePOAPsModal();

  useEffect(() => {
    async function fetchPOAPs() {
      setFetchingItems(true);

      let tokens: POAPToken[] = [];

      try {
        const { data: tokensData } = await axios.get(`https://api.poap.tech/actions/scan/${ensAddress}`);

        tokens = tokensData;
      } catch (error) {
        // TODO: HANDLE ERROR
        console.error(error);
      } finally {
        setItems(tokens);
        setFetchingItems(false);
      }
    }

    modalContainer.classList.add('modal-root');
    document.body.appendChild(modalContainer);
    document.body.style.overflow = 'hidden';

    fetchPOAPs();

    return () => {
      document.body.removeChild(modalContainer);
      document.body.style.overflow = 'auto';
    };
  }, [ensAddress, modalContainer, setItems, setFetchingItems]);

  const handleCloseModal = (event) => event.target === event.currentTarget && closeModal();

  //TODO: HANDLE NO POAPS STATE
  return createPortal(
    <ModalBase
      title="Configure POAPs"
      subtitle="Add your POAPs in the order you want to showcase them."
      handleCloseModal={handleCloseModal}
    >
      <BodyNavigation page={page} openRecentPage={openRecentPage} openCustomPage={openCustomPage} />
      {fetchingItems ? (
        <PreloaderPOAPs />
      ) : (
        <AnimatePresence mode="wait">
          {page === 'recent' && <RecentPOAPs key="recent-poaps" items={items} />}
          {page === 'custom' && (
            <CustomizePOAPs
              key="custom-poaps"
              items={items}
              selectedItems={selectedItems}
              handleReordering={handleReordering}
              addPOAPToSelectedItems={addPOAPToSelectedItems}
              removePOAPFromSelectedItems={removePOAPFromSelectedItems}
              clearSelectedItems={clearSelectedItems}
            />
          )}
        </AnimatePresence>
      )}
    </ModalBase>,
    modalContainer
  );
}
