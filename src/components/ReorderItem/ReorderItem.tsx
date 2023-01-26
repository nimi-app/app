import { Reorder } from 'framer-motion';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

import DragDotsSVG from '../../assets/svg/dragdots.svg';

type ReorderItemProps = {
  value: any;
};

export function ReorderItem({ value, children }: PropsWithChildren<ReorderItemProps>) {
  return (
    <Reorder.Item
      value={value}
      as="div"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '15px 15px 15px 39px',
        borderRadius: '12px',
        backgroundColor: '#F0F3FB',
        cursor: 'pointer',
      }}
    >
      {children}
      <DraggingDots />
    </Reorder.Item>
  );
}

const DraggingDots = styled(DragDotsSVG)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translate(0, -50%);
`;
