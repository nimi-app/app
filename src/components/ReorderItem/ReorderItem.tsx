import { Reorder } from 'framer-motion/dist/framer-motion';

export const ReorderItem = ({ value }) => {
  return (
    <Reorder.Item
      value={value}
      as="div"
      style={{
        width: '100%',
        padding: '15px 15px 15px 39px',
        borderRadius: '12px',
        backgroundColor: '#F1F1F1',
        marginBottom: '20px',
      }}
    >
      {value}
    </Reorder.Item>
  );
};
