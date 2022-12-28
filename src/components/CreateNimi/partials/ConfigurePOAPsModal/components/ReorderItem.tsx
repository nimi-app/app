import { POAPToken } from '@nimi.io/card';
import { Reorder, useDragControls } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as DotsIcon } from '../../../../../assets/svg/dots.svg';
import { POAPPlaceholder, StaticPOAP } from './POAPs';

interface ReorderItemProps {
  value: POAPToken;
  zIndex: number;
  getReorderingGroupRectangle: () => DOMRect;
  getDraggingEvent: (event: DragEvent) => void;
  getDraggingEventEnd: (event: DragEvent, poap: POAPToken) => void;
  movingChild: boolean;
}

export const ReorderItem = ({
  value,
  zIndex,
  getReorderingGroupRectangle,
  getDraggingEvent,
  getDraggingEventEnd,
  movingChild,
}: ReorderItemProps) => {
  const [amountOfRed, setAmountOfRed] = useState(0);
  const controls = useDragControls();

  const onDragHandler = (event: DragEvent) => {
    getDraggingEvent(event);

    const rect = getReorderingGroupRectangle();
    if (event.x - 50 < rect.x) return setAmountOfRed(event.x < rect.x ? 50 : rect.x + 50 - event.x);
    if (event.x + 50 > rect.x + rect.width)
      return setAmountOfRed(event.x > rect.x + rect.width ? 50 : event.x + 50 - rect.x - rect.width);

    setAmountOfRed(0);
  };

  const onDragEndHandler = (event: DragEvent) => {
    getDraggingEventEnd(event, value);

    setAmountOfRed(0);
  };

  return value ? (
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
        display: 'inline-block',
        position: 'relative',
        zIndex,
        marginRight: '-28px',
      }}
      onDrag={onDragHandler}
      onDragEnd={onDragEndHandler}
    >
      <Dragger onPointerDown={(e) => controls.start(e)}>
        <Dots />
      </Dragger>
      <StaticPOAP src={value.event.image_url} zIndex={zIndex * 2} />
      {amountOfRed !== 0 && <RedAlert zIndex={zIndex * 2 + 1} amountOfRed={amountOfRed} />}
    </Reorder.Item>
  ) : movingChild ? null : (
    <POAPPlaceholder zIndex={zIndex * 2} />
  );
};

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

type RedAlertProps = {
  zIndex: number;
  amountOfRed: number;
};

const RedAlert = styled.div<RedAlertProps>`
  width: 108px;
  height: 108px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex};
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
  ${({ amountOfRed }) =>
    `background: linear-gradient(
      180deg,
      rgba(255, 0, 0, ${(amountOfRed / 50) * 0.21}) 0%,
      rgba(255, 0, 0, ${(amountOfRed / 50) * 0.7}) 100%);
    `}
`;
