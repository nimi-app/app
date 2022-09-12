import { useState, useEffect, ReactNode, useRef } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Reorder, motion, AnimatePresence, useDragControls } from 'framer-motion/dist/framer-motion';

import { ReactComponent as CloseIcon } from '../../../../assets/svg/close-icon.svg';
import { ReactComponent as DotsIcon } from '../../../../assets/svg/dots.svg';
import { NimiSignatureColor } from '../../../../theme';
import { NimiPOAPWidget } from '@nimi.io/card';

type POAPToken = {
  event: POAPEvent;
  tokenId: string;
  owner: string;
  chain: string;
  created: string;
};

type POAPEvent = {
  id: number;
  fancy_id: string;
  name: string;
  event_url: string;
  image_url: string;
  country: string;
  city: string;
  description: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  supply: number;
};

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
  console.log('ENS ADDRESS', ensAddress);
  console.log('WIDGET', widget);

  const [modalContainer] = useState(() => document.createElement('div'));
  const [customOrder, setCustomOrder] = useState(false);
  const [items, setItems] = useState<POAPToken[]>([]);
  const [fetchingItems, setFetchingItems] = useState(false);
  const [selectedItems, setSelectedItems] = useState<POAPToken[]>([]);

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
  }, []);

  const setCustomOrderHandler = (v: boolean) => () => setCustomOrder(v);

  const handleCloseModal = (event) => {
    if (event.target === event.currentTarget) closeModal();
  };

  const addPOAPToSelectedItems = (poap: POAPToken) => {
    if (!selectedItems.some((item) => item.tokenId === poap.tokenId) && selectedItems.length < 6) {
      setSelectedItems((selectedItems) => [...selectedItems, poap]);
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

const AnimatedSection = ({ children }: { children: ReactNode }) => (
  <AnimatedContainer
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </AnimatedContainer>
);

const RecentPOAPs = ({ items }) => (
  <AnimatedSection>
    <PresentedPOAPsContainer>
      {items.slice(0, 6).map((item) => (
        <StaticPOAP key={item.tokenId} src={item.event.image_url} />
      ))}
    </PresentedPOAPsContainer>
  </AnimatedSection>
);

const CustomizePOAPs = ({ items, selectedItems, setSelectedItems, addPOAPToSelectedItems }) => (
  <AnimatedSection>
    <PresentedPOAPsContainer>
      <Reorder.Group axis="x" values={items} onReorder={setSelectedItems} as="div">
        {selectedItems.map((item) => (
          <ReorderItem key={item.tokenId} value={item} />
        ))}
      </Reorder.Group>
    </PresentedPOAPsContainer>
    <AvailablePOAPsContainer>
      <AvailablePOAPsTitleContainer>
        <AvailablePOAPsTitle>Choose Which POAP to Show</AvailablePOAPsTitle>
      </AvailablePOAPsTitleContainer>
      <AvailablePOAPsList>
        {items.map((poap) => (
          <StaticPOAP
            key={poap.tokenId}
            src={poap.event.image_url}
            marginRight="-16px"
            onClick={() => addPOAPToSelectedItems(poap)}
            cursorPointer
          />
        ))}
      </AvailablePOAPsList>
    </AvailablePOAPsContainer>
  </AnimatedSection>
);

const ReorderItem = ({ value }) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
      dragElastic={0.1}
      whileTap={{ scale: 1.1 }}
      as="div"
      style={{
        width: 108,
        height: 108,
        position: 'relative',
        display: 'inline-block',
        marginRight: '-33px',
      }}
    >
      <Dragger onPointerDown={(e) => controls.start(e)}>
        <Dots />
      </Dragger>
      <StaticPOAP src={value.event.image_url} />
    </Reorder.Item>
  );
};

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
`;

const Modal = styled(motion.div)`
  width: 620px;
  padding: 32px;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0px 0 62px rgba(52, 55, 100, 0.15);
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

const PresentedPOAPsContainer = styled.div`
  padding: 22px;
  background-color: #f1f2f5;
  border-radius: 76px;
`;

const AvailablePOAPsContainer = styled.div`
  width: 100%;
  background-color: #f1f2f5;
  border-radius: 12px;
  padding: 28px 0;
  margin-top: 24px;
`;

const AvailablePOAPsTitleContainer = styled.div`
  height: 56px;
  padding: 19px 36px;
  margin-bottom: 32px;
`;

const AvailablePOAPsTitle = styled.h3`
  line-height: 18px;
  font-size: 18px;
  color: black;
`;

const AvailablePOAPsList = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
`;

type StaticPOAPProps = {
  marginRight?: string;
  cursorPointer?: boolean;
};

const StaticPOAP = styled.img<StaticPOAPProps>`
  width: 108px;
  height: 108px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
  margin-right: ${(props) => props.marginRight || '-28px'};
  background-color: white;
  box-shadow: 0px 14px 24px rgba(52, 55, 100, 0.12);

  ${({ cursorPointer }) => cursorPointer && 'cursor: pointer;'}
`;

const AnimatedContainer = styled(motion.div)`
  width: 100%;
`;

const Dragger = styled.div`
  width: 34px;
  height: 50px;
  position: absolute;
  bottom: -17px;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 0 0 8px 8px;
  background-color: white;
  user-select: none;
  cursor: pointer;
  box-shadow: 0px 14px 24px rgba(52, 55, 100, 0.12);
`;

const Dots = styled(DotsIcon)`
  position: absolute;
  bottom: 7px;
  left: 50%;
  transform: translate(-50%, 0);
`;
