import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

/**
 * Use this component to wrap a component that you want to animate
 * @param param0
 * @returns
 */
export function OpacityMotion({ children }: PropsWithChildren) {
  return (
    <StyledMotionDiv
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { opacity: 1, height: 'auto' },
        collapsed: { opacity: 0, height: 0 },
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </StyledMotionDiv>
  );
}

const StyledMotionDiv = styled(motion.div)`
  width: 100%;
`;
