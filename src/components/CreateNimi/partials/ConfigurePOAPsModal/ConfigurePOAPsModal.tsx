import { useState, useEffect } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';

import { ReactComponent as CloseIcon } from '../../../../assets/svg/close-icon.svg';
import { NimiSignatureColor } from '../../../../theme';
import { NimiPOAPWidget } from '@nimi.io/card';
import { POAPToken } from './types';

import { RecentPOAPs, CustomizePOAPs } from './components';

type NavigationLinkProps = {
  children: string;
  onClick?: () => void;
  selected: boolean;
};

// TODO: UPDATE NAVIGATION LINK WITH BORDER BOTTOM
const NavigationLink = ({ children, onClick, selected }: NavigationLinkProps) => (
  <LinkContainer>
    <Link onClick={onClick}>{children}</Link>
    {selected && <LinkUnderline />}
  </LinkContainer>
);

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

  const addPOAPToSelectedItems = (poap: POAPToken) => {
    const addedPoaps = selectedItems.filter((item) => item !== null);

    if (!addedPoaps.some((item) => item.tokenId === poap.tokenId) && addedPoaps.length < 6) {
      setSelectedItems([...addedPoaps, poap, ...new Array(5 - addedPoaps.length).fill(null)]);
    }
  };

  return createPortal(
    <Backdrop onClick={handleCloseModal}>
      {/* // TODO: UPDATE EXIT ANIMATION */}
      <Modal
        initial={{ opacity: 0, scale: 0.5, y: '-100%' }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: '-100%' }}
      >
        <Header>
          <ModalTitle>Configure POAPs</ModalTitle>
          <ModalSubtitle>Add your POAPs in the order you want to showcase them.</ModalSubtitle>
          <CloseButton onClick={handleCloseModal} />
        </Header>
        {fetchingItems ? (
          <div>Fetching POAPs...</div>
        ) : (
          <Body>
            <BodyControls>
              <BodyTitle>POAPs</BodyTitle>
              <BodyNavigation>
                <NavigationLink selected={!customOrder} onClick={setCustomOrderHandler(false)}>
                  Most Recent
                </NavigationLink>
                <NavigationLink selected={customOrder} onClick={setCustomOrderHandler(true)}>
                  Custom Order
                </NavigationLink>
              </BodyNavigation>
            </BodyControls>
            <AnimatePresence mode="wait">
              {customOrder ? (
                <CustomizePOAPs
                  key="custom-poaps"
                  items={items}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  addPOAPToSelectedItems={addPOAPToSelectedItems}
                />
              ) : (
                <RecentPOAPs key="recent-poaps" items={items} />
              )}
            </AnimatePresence>
          </Body>
        )}
      </Modal>
    </Backdrop>,
    modalContainer
  );
}

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  padding-top: 40px;
`;

const Modal = styled(motion.div)`
  width: 620px;
  padding: 32px;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0px 0 62px rgba(52, 55, 100, 0.15);
  margin: 0 auto;
`;

const Header = styled.header`
  position: relative;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h1`
  line-height: 28px;
  font-size: 28px;
  ${NimiSignatureColor}
  margin-bottom: 16px;
`;

const ModalSubtitle = styled.p`
  line-height: 15px;
  font-size: 14px;
  color: #7a7696;
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const Body = styled.main`
  width: 100%;
`;

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

const BodyNavigation = styled.nav``;

const LinkContainer = styled.div`
  display: inline-block;
  margin-left: 18px;
`;

const Link = styled.a`
  display: inline-block;
  vertical-align: top;
  line-height: 15px;
  font-size: 14px;
  ${NimiSignatureColor}
  cursor: pointer;
  margin-bottom: 4px;
`;

const LinkUnderline = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
`;
