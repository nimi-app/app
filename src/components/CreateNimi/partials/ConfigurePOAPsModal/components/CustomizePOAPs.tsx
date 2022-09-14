import { useState } from 'react';
import styled from 'styled-components';
import { Reorder } from 'framer-motion/dist/framer-motion';

import { AnimatedSection } from './AnimatedSection';
import { PresentedPOAPsContainer } from './PresentedPOAPsContainer';
import { StaticPOAP } from './POAPs';
import { ReorderItem } from './ReorderItem';

import { ReactComponent as TrashCanSVG } from '../../../../../assets/svg/trash-can.svg';

import { POAPToken } from '../types';

export const CustomizePOAPs = ({
  items,
  selectedItems,
  handleReordering,
  addPOAPToSelectedItems,
  removePOAPFromSelectedItems,
  clearSelectedItems,
}) => {
  const [filterValue, setFilterValue] = useState('');
  const [childOutside, setChildOutside] = useState<'left' | 'right' | 'none'>('none');
  const [movingChild, setMovingChild] = useState(false);

  const checkIfMatchesFilter = (token: POAPToken) =>
    token.event.name.toLowerCase().includes(filterValue.toLowerCase()) ||
    token.event.description.toLowerCase().includes(filterValue.toLowerCase()) ||
    token.event.country.toLowerCase().includes(filterValue.toLowerCase()) ||
    token.event.city.toLowerCase().includes(filterValue.toLowerCase());

  const getReorderingGroupRectangle = () => document.getElementById('reorder-group')?.getBoundingClientRect();

  const getDraggingEvent = (event: DragEvent) => {
    setMovingChild(true);

    const rect = getReorderingGroupRectangle();

    if (rect) {
      if (event.x < rect.x) return setChildOutside('left');
      if (event.x > rect.x + rect.width) return setChildOutside('right');
    }

    setChildOutside('none');
  };

  const getDraggingEventEnd = (event: DragEvent, poap: POAPToken) => {
    setChildOutside('none');
    setMovingChild(false);

    const rect = getReorderingGroupRectangle();

    if (rect && (event.x < rect.x || event.x > rect.x + rect.width)) removePOAPFromSelectedItems(poap);
  };

  return (
    <AnimatedSection>
      <PresentedPOAPsContainer childOutside={childOutside}>
        <Reorder.Group id="reorder-group" axis="x" values={items} onReorder={handleReordering} as="div">
          {selectedItems.map((item, index) => (
            <ReorderItem
              key={item?.tokenId || index}
              value={item}
              index={index}
              getDraggingEvent={getDraggingEvent}
              getDraggingEventEnd={getDraggingEventEnd}
              movingChild={movingChild}
            />
          ))}
        </Reorder.Group>
        {childOutside !== 'none' && <TrashCan childOutside={childOutside} />}
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
        <SelectedPOAPsInfo>
          <NumberOfSelectedPOAPs>
            {selectedItems.filter((item) => item !== null).length} out of 6 selected
          </NumberOfSelectedPOAPs>
          <ClearSelectionButton onClick={clearSelectedItems}>Clear Selection</ClearSelectionButton>
        </SelectedPOAPsInfo>
      </AvailablePOAPsContainer>
    </AnimatedSection>
  );
};

const TrashCan = styled(TrashCanSVG)<{ childOutside: 'left' | 'right' | 'none' }>`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);

  ${({ childOutside }) => `${childOutside}: 30px;`}
`;

const AvailablePOAPsContainer = styled.div`
  width: 100%;
  background-color: #f1f2f5;
  border-radius: 12px;
  padding: 36px 0;
  margin-top: 24px;
`;

const AvailablePOAPsTitleContainer = styled.div`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
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
  height: 162px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 24px 22px;
`;

const SelectedPOAPsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 36px;
`;

const NumberOfSelectedPOAPs = styled.p`
  line-height: 15px;
  font-size: 14px;
  color: #7a7696;
`;

const ClearSelectionButton = styled.a`
  line-height: 15px;
  font-size: 14px;
  color: #7a7696;
  text-decoration: underline;
  cursor: pointer;
`;
