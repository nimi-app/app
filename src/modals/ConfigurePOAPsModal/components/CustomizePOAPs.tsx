import { POAPToken } from '@nimi.io/card/types';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

import TrashCanSVG from '../../../../../assets/svg/trash-can.svg';
import { AnimatedSection } from './AnimatedSection';
import { StaticPOAP } from './POAPs';
import { PresentedPOAPsContainer } from './PresentedPOAPsContainer';
import { ReorderItem } from './ReorderItem';

interface CustomizePOAPsProps {
  items: POAPToken[];
  selectedItems: POAPToken[];
  handleReordering: (items: POAPToken[]) => void;
  addPOAPToSelectedItems: (poap: POAPToken) => void;
  removePOAPFromSelectedItems: (poap: POAPToken) => void;
  clearSelectedItems: () => void;
  checkIfPOAPIsSelected: (poap: POAPToken) => boolean;
}

export const CustomizePOAPs = ({
  items,
  selectedItems,
  handleReordering,
  addPOAPToSelectedItems,
  removePOAPFromSelectedItems,
  clearSelectedItems,
  checkIfPOAPIsSelected,
}: CustomizePOAPsProps) => {
  const [filterValue, setFilterValue] = useState('');
  const [childOutside, setChildOutside] = useState<'left' | 'right' | 'none'>('none');
  const [movingChild, setMovingChild] = useState(false);

  const checkIfMatchesFilter = (token: POAPToken) =>
    token.event.name.toLowerCase().includes(filterValue.toLowerCase()) ||
    token.event.description.toLowerCase().includes(filterValue.toLowerCase()) ||
    token.event.country.toLowerCase().includes(filterValue.toLowerCase()) ||
    token.event.city.toLowerCase().includes(filterValue.toLowerCase());

  const getReorderingGroupRectangle = () =>
    document.getElementById('reorder-group')?.getBoundingClientRect() as DOMRect;

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

  const getFilteredItems = () => items.filter((item) => checkIfMatchesFilter(item));

  return (
    <AnimatedSection>
      <PresentedPOAPsContainer childOutside={childOutside}>
        <Reorder.Group id="reorder-group" axis="x" values={items} onReorder={handleReordering} as="div">
          {selectedItems.map((item, index) => (
            <ReorderItem
              key={item?.tokenId || index}
              value={item}
              zIndex={index}
              getReorderingGroupRectangle={getReorderingGroupRectangle}
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
          {getFilteredItems().length ? (
            getFilteredItems().map((poap) => (
              <AvailablePOAPContainer key={poap.tokenId}>
                <StaticPOAP
                  src={poap.event.image_url}
                  onClick={() => addPOAPToSelectedItems(poap)}
                  marginRight="0"
                  cursorPointer
                />
                {checkIfPOAPIsSelected(poap) && (
                  <SelectedInfo onClick={() => removePOAPFromSelectedItems(poap)}>Selected</SelectedInfo>
                )}
              </AvailablePOAPContainer>
            ))
          ) : (
            <NoPOAPsText>No data matching the given filter criteria</NoPOAPsText>
          )}
        </AvailablePOAPsList>
        <SelectedPOAPsInfo>
          <NumberOfSelectedPOAPs>
            {selectedItems.filter((item) => item !== null).length} out of 6 selected
          </NumberOfSelectedPOAPs>
          <ClearSelectionButton
            anyItemSelected={!!selectedItems.filter((item) => item !== null).length}
            onClick={clearSelectedItems}
          >
            Clear Selection
          </ClearSelectionButton>
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
  position: relative;
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

const ClearSelectionButton = styled.a<{ anyItemSelected: boolean }>`
  line-height: 15px;
  font-size: 14px;
  color: #7a7696;
  text-decoration: underline;
  ${({ anyItemSelected }) =>
    anyItemSelected
      ? 'cursor: pointer;'
      : `
        opacity: 0.5;
        cursor: not-allowed;
  `}
`;

const AvailablePOAPContainer = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin-right: -16px;
`;

const SelectedInfo = styled.div`
  width: 108px;
  height: 108px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  line-height: 108px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-align: center;
  color: white;
  background-color: #393939cc;
  cursor: pointer;
`;

const NoPOAPsText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #7a7696;
  padding: 0 14px;
`;
