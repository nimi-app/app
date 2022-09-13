import { useState, useEffect } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';

import { ModalBase } from '../ModalBase';
import { NimiSignatureColor } from '../../../../theme';
import { NimiPOAPWidget } from '@nimi.io/card';
import { POAPToken } from './types';

import { RecentPOAPs, CustomizePOAPs } from './components';

type ConfigurePOAPsModalProps = {
  ensAddress: string;
  widget: NimiPOAPWidget;
  closeModal: () => void;
};

export function ConfigurePOAPsModal({ ensAddress, widget, closeModal }: ConfigurePOAPsModalProps) {
  const [modalContainer] = useState(() => document.createElement('div'));
  const [customOrder, setCustomOrder] = useState(false);
  const [items, setItems] = useState<POAPToken[]>([]);
  const [fetchingItems, setFetchingItems] = useState(false);
  const [selectedItems, setSelectedItems] = useState<POAPToken[]>(new Array(6).fill(null));

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
  }, [ensAddress, modalContainer]);

  const setCustomOrderHandler = (v: boolean) => () => setCustomOrder(v);

  const handleCloseModal = (event) => {
    if (event.target === event.currentTarget) closeModal();
  };

  const handleReordering = (items) => {
    console.log('HANDLE REORDERING TRIGGERED');

    setSelectedItems([...items, ...new Array(6 - items.length).fill(null)]);
  };

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

  //TODO: HANDLE NO POAPS STATE
  return createPortal(
    <ModalBase
      title="Configure POAPs"
      subtitle="Add your POAPs in the order you want to showcase them."
      handleCloseModal={handleCloseModal}
    >
      {fetchingItems ? (
        <div>Fetching POAPs...</div>
      ) : (
        <>
          <BodyControls>
            <BodyTitle>POAPs</BodyTitle>
            <Navigation>
              <NavigationLink selected={!customOrder} onClick={setCustomOrderHandler(false)}>
                Most Recent
              </NavigationLink>
              <NavigationLink selected={customOrder} onClick={setCustomOrderHandler(true)}>
                Custom Order
              </NavigationLink>
            </Navigation>
          </BodyControls>
          <AnimatePresence mode="wait">
            {customOrder ? (
              <CustomizePOAPs
                key="custom-poaps"
                items={items}
                selectedItems={selectedItems}
                handleReordering={handleReordering}
                addPOAPToSelectedItems={addPOAPToSelectedItems}
                removePOAPFromSelectedItems={removePOAPFromSelectedItems}
              />
            ) : (
              <RecentPOAPs key="recent-poaps" items={items} />
            )}
          </AnimatePresence>
        </>
      )}
    </ModalBase>,
    modalContainer
  );
}

const BodyControls = styled.div`
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const BodyTitle = styled.h2`
  line-height: 26px;
  font-size: 26px;
  color: black;
`;

const Navigation = styled.nav``;

const NavigationLink = styled.a<{ selected: boolean }>`
  display: inline-block;
  vertical-align: top;
  line-height: 15px;
  font-size: 14px;
  ${NimiSignatureColor}
  cursor: pointer;
  margin-left: 18px;
  ${({ selected }) =>
    selected &&
    `
      border-bottom: 2px solid;
      border-image-source: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
      border-image-slice: 1;
      padding-bottom: 4px;
  `}
`;
