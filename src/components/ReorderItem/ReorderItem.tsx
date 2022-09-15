import { Reorder } from 'framer-motion/dist/framer-motion';

export const ReorderItem = ({ value }) => {
  return (
    <Reorder.Item value={value} as="div">
      {value}
    </Reorder.Item>
  );
};
