import { POAPToken } from '@nimi.io/card/types';
import { useState } from 'react';

export function useConfigurePOAPsModal() {
  const [modalContainer] = useState(() => document.createElement('div'));
  const [page, setPage] = useState<'recent' | 'custom'>('recent');
  const [items, setItems] = useState<POAPToken[]>([]);
  const [fetchingItems, setFetchingItems] = useState(false);
  const [selectedItems, setSelectedItems] = useState<POAPToken[]>(new Array(6).fill(null));

  const openRecentPage = () => setPage('recent');
  const openCustomPage = () => setPage('custom');

  const handleReordering = (items: any) => setSelectedItems([...items, ...new Array(6 - items.length).fill(null)]);

  const getAddedPOAPs = () => selectedItems.filter((item) => item !== null);

  const addPOAPToSelectedItems = (poap: POAPToken) => {
    const addedPoaps = getAddedPOAPs();

    if (!addedPoaps.some((item) => item.tokenId === poap.tokenId)) {
      addedPoaps.length < 6
        ? setSelectedItems([...addedPoaps, poap, ...new Array(5 - addedPoaps.length).fill(null)])
        : setSelectedItems([...addedPoaps.slice(0, addedPoaps.length - 1), poap]);
    }
  };

  const removePOAPFromSelectedItems = (poap: POAPToken) => {
    const updatedPOAPs = getAddedPOAPs().filter((item) => item.tokenId !== poap.tokenId);

    setSelectedItems([...updatedPOAPs, ...new Array(6 - updatedPOAPs.length).fill(null)]);
  };

  const checkIfPOAPIsSelected = (poap: POAPToken) => getAddedPOAPs().some((item) => item.tokenId === poap.tokenId);

  const clearSelectedItems = () => setSelectedItems(new Array(6).fill(null));

  return {
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
  };
}
