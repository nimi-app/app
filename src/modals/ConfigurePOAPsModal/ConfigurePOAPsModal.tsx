import { createPOAPClient, fetchUserPOAPs } from '@nimi.io/card/api';
import { Nimi, NimiWidget, NimiWidgetType, POAPToken } from '@nimi.io/card/types';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { BodyNavigation, CustomizePOAPs, NoPOAPs, PreloaderPOAPs, RecentPOAPs } from './components';
import { useConfigurePOAPsModal } from './useConfigurePOAPsModal';
import { Modal } from '../../components/Modal';

type ConfigurePOAPsModalProps = {
  ensAddress: string;
  closeModal: () => void;
};
const getTokenIds = (getValues) => {
  let tokenIds: undefined | string[];

  const widgets = getValues('widgets').filter((el) => el.type === NimiWidgetType.POAP);

  if (widgets.length && widgets[0].hasOwnProperty('context')) tokenIds = widgets[0].context?.tokenIds;

  return tokenIds;
};

export function ConfigurePOAPsModal({ ensAddress, closeModal }: ConfigurePOAPsModalProps) {
  const { getValues, setValue } = useFormContext<Nimi>();

  const {
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
    setSelectedItems,
  } = useConfigurePOAPsModal();

  useEffect(() => {
    async function fetchPOAPs() {
      setFetchingItems(true);

      let tokens: POAPToken[] = [];

      try {
        tokens = await fetchUserPOAPs(createPOAPClient(process.env.REACT_APP_POAP_API_KEY as string), ensAddress);
      } catch (error) {
        // TODO: HANDLE ERROR
        console.error(error);
      } finally {
        setItems(tokens);
        const tokenIds = getTokenIds(getValues);
        if (tokenIds) {
          const selectedTokens = tokens.filter((token) => tokenIds.some((tokenId) => tokenId === token.tokenId));
          setSelectedItems(selectedTokens);
        }

        setFetchingItems(false);
      }
    }

    fetchPOAPs();
  }, [ensAddress, setItems, setFetchingItems, setSelectedItems, getValues]);

  const handleCloseModal = () => {
    const otherWidgets = getValues('widgets').filter((el: NimiWidget) => el.type !== NimiWidgetType.POAP);

    if (page === 'recent') {
      setValue('widgets', [...otherWidgets, { type: NimiWidgetType.POAP } as NimiWidget]);
    } else {
      const selectedTokens = selectedItems.filter((item) => item !== null);

      setValue('widgets', [
        ...otherWidgets,
        {
          type: NimiWidgetType.POAP,
          ...(selectedTokens.length && {
            context: {
              tokenIds: selectedTokens.map((token) => token.tokenId),
            },
          }),
        } as NimiWidget,
      ]);
    }

    closeModal();
  };

  return (
    <Modal
      title="Configure POAPs"
      subtitle="Add your POAPs in the order you want to showcase them."
      handleCloseModal={handleCloseModal}
    >
      <BodyNavigation
        page={page}
        openRecentPage={openRecentPage}
        openCustomPage={openCustomPage}
        noPOAPs={items?.length === 0}
      />
      {(() => {
        if (fetchingItems) return <PreloaderPOAPs />;
        if (items?.length === 0) return <NoPOAPs />;
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
    </Modal>
  );
}
