import { ReactNode } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion/dist/framer-motion';

export const AnimatedSection = ({ children }: { children: ReactNode }) => (
  <AnimatedContainer
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </AnimatedContainer>
);

const AnimatedContainer = styled(motion.div)`
  width: 100%;
`;
