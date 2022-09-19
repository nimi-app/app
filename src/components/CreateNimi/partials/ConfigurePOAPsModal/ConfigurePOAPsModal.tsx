import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';

import { ModalBase } from '../ModalBase';
import { NimiWidgetType } from '@nimi.io/card';

import { BodyNavigation, PreloaderPOAPs, NoPOAPs, RecentPOAPs, CustomizePOAPs } from './components';
import { POAPToken } from './types';

import { useConfigurePOAPsModal } from './useConfigurePOAPsModal';
import { useFormContext } from 'react-hook-form';

type ConfigurePOAPsModalProps = {
  ensAddress: string;
  closeModal: () => void;
};

export function ConfigurePOAPsModal({ ensAddress, closeModal }: ConfigurePOAPsModalProps) {
  const { getValues, setValue } = useFormContext();

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
    checkIfPOAPIsSelected,
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

  const handleCloseModal = (event) => {
    if (event.target === event.currentTarget) {
      const otherWidgets = getValues('widgets').filter((el) => el.type !== NimiWidgetType.POAP);
      const selectedTokens = selectedItems.filter((item) => item !== null);

      setValue('widgets', [
        ...otherWidgets,
        {
          type: NimiWidgetType.POAP,
          ...(selectedTokens.length && {
            tokenIds: selectedTokens.map((token) => token.tokenId),
          }),
        },
      ]);

      closeModal();
    }
  };

  return createPortal(
    <ModalBase
      title="Configure POAPs"
      subtitle="Add your POAPs in the order you want to showcase them."
      handleCloseModal={handleCloseModal}
    >
      <BodyNavigation
        page={page}
        openRecentPage={openRecentPage}
        openCustomPage={openCustomPage}
        noPOAPs={items.length === 0}
      />
      {(() => {
        if (fetchingItems) return <PreloaderPOAPs />;
        if (items.length === 0) return <NoPOAPs />;
        return (
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
                checkIfPOAPIsSelected={checkIfPOAPIsSelected}
              />
            )}
          </AnimatePresence>
        );
      })()}
    </ModalBase>,
    modalContainer
  );
}
