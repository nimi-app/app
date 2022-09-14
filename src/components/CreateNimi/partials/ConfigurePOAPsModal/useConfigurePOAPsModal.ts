import { useState } from 'react';

import { POAPToken } from './types';

export function useConfigurePOAPsModal() {
  const [modalContainer] = useState(() => document.createElement('div'));
  const [customOrder, setCustomOrder] = useState(false);
  const [items, setItems] = useState<POAPToken[]>([]);
  const [fetchingItems, setFetchingItems] = useState(false);
  const [selectedItems, setSelectedItems] = useState<POAPToken[]>(new Array(6).fill(null));

  const setCustomOrderHandler = (v: boolean) => () => setCustomOrder(v);

  const handleReordering = (items) => setSelectedItems([...items, ...new Array(6 - items.length).fill(null)]);

  const addPOAPToSelectedItems = (poap: POAPToken) => {
    const addedPoaps = selectedItems.filter((item) => item !== null);

    if (!addedPoaps.some((item) => item.tokenId === poap.tokenId) && addedPoaps.length < 6) {
      setSelectedItems([...addedPoaps, poap, ...new Array(5 - addedPoaps.length).fill(null)]);
    }
  };

  const removePOAPFromSelectedItems = (poap: POAPToken) => {
    const addedPoaps = selectedItems.filter((item) => item !== null);

    if (addedPoaps.length) {
      const updatedPOAPs = addedPoaps.filter((item) => item.tokenId !== poap.tokenId);

      setSelectedItems([...updatedPOAPs, , ...new Array(6 - updatedPOAPs.length).fill(null)]);
    }
  };

  const clearSelectedItems = () => setSelectedItems(new Array(6).fill(null));

  return {
    modalContainer,
    customOrder,
    setCustomOrderHandler,
    items,
    setItems,
    fetchingItems,
    setFetchingItems,
    selectedItems,
    handleReordering,
    addPOAPToSelectedItems,
    removePOAPFromSelectedItems,
    clearSelectedItems,
  };
}
