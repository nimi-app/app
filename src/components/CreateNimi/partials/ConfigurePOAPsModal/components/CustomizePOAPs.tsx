import { useState } from 'react';
import styled from 'styled-components';
import { Reorder } from 'framer-motion/dist/framer-motion';

import { AnimatedSection } from './AnimatedSection';
import { PresentedPOAPsContainer } from './PresentedPOAPsContainer';
import { StaticPOAP } from './POAPs';
import { ReorderItem } from './ReorderItem';

import { POAPToken } from '../types';

export const CustomizePOAPs = ({
  items,
  selectedItems,
  handleReordering,
  addPOAPToSelectedItems,
  removePOAPFromSelectedItems,
}) => {
  const [filterValue, setFilterValue] = useState('');

  const checkIfMatchesFilter = (token: POAPToken) =>
    token.event.name.toLowerCase().includes(filterValue.toLowerCase()) ||
    token.event.description.toLowerCase().includes(filterValue.toLowerCase()) ||
    token.event.country.toLowerCase().includes(filterValue.toLowerCase()) ||
    token.event.city.toLowerCase().includes(filterValue.toLowerCase());

  const getDragEvent = (event: DragEvent, poap: POAPToken) => {
    const element = document.getElementById('reorder-group');
    const rect = element?.getBoundingClientRect();

    if (rect && (event.x < rect.x || event.x > rect.x + rect.width)) {
      removePOAPFromSelectedItems(poap);
    }
  };

  return (
    <AnimatedSection>
      <PresentedPOAPsContainer>
        <Reorder.Group id="reorder-group" axis="x" values={items} onReorder={handleReordering} as="div">
          {selectedItems.map((item, index) => (
            <ReorderItem key={item?.tokenId || index} value={item} index={index} getDragEvent={getDragEvent} />
          ))}
        </Reorder.Group>
      </PresentedPOAPsContainer>
      <AvailablePOAPsContainer>
        <AvailablePOAPsTitleContainer>
          <AvailablePOAPsTitle>Choose Which POAP to Show</AvailablePOAPsTitle>
          <FilterInput
            placeholder="Filter"
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
            spellCheck={false}
          />
        </AvailablePOAPsTitleContainer>
        <AvailablePOAPsList>
          {items
            .filter((item) => checkIfMatchesFilter(item))
            .map((poap) => (
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
};

const AvailablePOAPsContainer = styled.div`
  width: 100%;
  background-color: #f1f2f5;
  border-radius: 12px;
  padding: 28px 0;
  margin-top: 24px;
`;

const AvailablePOAPsTitleContainer = styled.div`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  margin-bottom: 32px;
`;

const AvailablePOAPsTitle = styled.h3`
  height: 18px;
  line-height: 18px;
  font-size: 18px;
  color: black;
`;

const FilterInput = styled.input`
  height: 36px;
  width: 171px;
  padding: 6px 16px;
  border: 2px solid #e6e8ec;
  border-radius: 12px;
  background-color: white;
  outline: none;
`;

const AvailablePOAPsList = styled.div`
  width: 100%;
  height: 108px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding-left: 22px;
`;
