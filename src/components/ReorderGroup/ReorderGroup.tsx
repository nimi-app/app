import { Reorder } from 'framer-motion';
import { ReactNode } from 'react';

interface ReorderGroupProps {
  children: ReactNode;
  values: any[];
  onReorder: (v: any[]) => void;
}

export function ReorderGroup({ children, values, onReorder }: ReorderGroupProps) {
  const style = { width: '100%', gap: '14px', display: 'flex', flexDirection: 'column' };

  return (
    <Reorder.Group axis="y" values={values} onReorder={onReorder} as="div" style={style as any}>
      {children}
    </Reorder.Group>
  );
}
