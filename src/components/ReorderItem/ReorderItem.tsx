import { ReactNode } from 'react';
import styled from 'styled-components';
import { Reorder } from 'framer-motion';

import { ReactComponent as DragDotsSVG } from '../../assets/svg/dragdots.svg';

type ReorderItemProps<T> = {
  value: T;
  children: ReactNode[];
};

export function ReorderItem<T>({ value, children }: ReorderItemProps<T>) {
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
