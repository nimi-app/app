import styled from 'styled-components';
import { Reorder, useDragControls } from 'framer-motion/dist/framer-motion';

import { StaticPOAP, POAPPlaceholder } from './POAPs';
import { ReactComponent as DotsIcon } from '../../../../../assets/svg/dots.svg';

export const ReorderItem = ({ value, index }) => {
  const controls = useDragControls();

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
        position: 'relative',
        display: 'inline-block',
        marginRight: '-28px',
      }}
    >
      <Dragger onPointerDown={(e) => controls.start(e)}>
        <Dots />
      </Dragger>
      <StaticPOAP src={value.event.image_url} zIndex={index + 1} />
    </Reorder.Item>
  ) : (
    <POAPPlaceholder zIndex={index + 1} />
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
