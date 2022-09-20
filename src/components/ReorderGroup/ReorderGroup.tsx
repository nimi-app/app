import { ReactNode } from 'react';
import { Reorder } from 'framer-motion/dist/framer-motion';

interface ReorderGroupProps {
  children: ReactNode;
  values: any[];
  onReorder: (v: any[]) => void;
}

export function ReorderGroup({ children, values, onReorder }: ReorderGroupProps) {
  const style = { width: '100%' };

  return (
    <Reorder.Group axis="y" values={values} onReorder={onReorder} as="div" style={style}>
      {children}
    </Reorder.Group>
  );
}
