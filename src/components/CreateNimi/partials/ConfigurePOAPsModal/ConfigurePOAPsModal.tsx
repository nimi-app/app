import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';

import { ModalBase } from '../ModalBase';
import { NimiSignatureColor } from '../../../../theme';
import { NimiPOAPWidget } from '@nimi.io/card';

import { RecentPOAPs, CustomizePOAPs } from './components';
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
                clearSelectedItems={clearSelectedItems}
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
