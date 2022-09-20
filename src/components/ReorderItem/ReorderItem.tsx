import { ReactNode } from 'react';
import styled from 'styled-components';
import { Reorder } from 'framer-motion/dist/framer-motion';

import { ReactComponent as DragDotsSVG } from '../../assets/svg/dragdots.svg';

type ReorderItemProps<T> = {
  value: T;
  children?: ReactNode[];
};

export function ReorderItem<T extends unknown>({ value, children }: ReorderItemProps<T>) {
  const style = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: '15px 15px 15px 39px',
    borderRadius: '12px',
    backgroundColor: '#F1F1F1',
    marginBottom: '20px',
    cursor: 'pointer',
  };

  return (
    <Reorder.Item value={value} as="div" style={style}>
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
