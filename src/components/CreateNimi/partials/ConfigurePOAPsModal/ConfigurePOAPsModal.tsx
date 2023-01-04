import { Nimi, NimiWidget, NimiWidgetType, POAPToken } from '@nimi.io/card/types';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { getPOAPAPIClient } from '../../../../api/RestAPI/utils';
import { ModalPortal } from '../../../Modal';
import { BodyNavigation, CustomizePOAPs, NoPOAPs, PreloaderPOAPs, RecentPOAPs } from './components';
import { useConfigurePOAPsModal } from './useConfigurePOAPsModal';

type ConfigurePOAPsModalProps = {
  ensAddress: string;
  closeModal: () => void;
};

export function ConfigurePOAPsModal({ ensAddress, closeModal }: ConfigurePOAPsModalProps) {
  const { getValues, setValue } = useFormContext<Nimi>();

  // TODO: Implement react-query fetching here
  // const { data: poapData, isFetching } = usePoapsFromUser(ensAddress);
  // console.log('poapData', poapData);
  // console.log('isFetching', isFetching);

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
  } = useConfigurePOAPsModal();

  useEffect(() => {
    async function fetchPOAPs() {
      setFetchingItems(true);

      let tokens: POAPToken[] = [];

      try {
        const { data: tokensData } = await getPOAPAPIClient().get(`/actions/scan/${ensAddress}`);

        tokens = tokensData;
      } catch (error) {
        // TODO: HANDLE ERROR
        console.error(error);
      } finally {
        setItems(tokens);
        setFetchingItems(false);
      }
    }

    fetchPOAPs();
  }, [ensAddress, setItems, setFetchingItems]);

  const handleCloseModal = () => {
    const otherWidgets = getValues('widgets').filter((el: NimiWidget) => el.type !== NimiWidgetType.POAP);
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

    closeModal();
  };

  return (
    <ModalPortal
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
    </ModalPortal>
  );
}
