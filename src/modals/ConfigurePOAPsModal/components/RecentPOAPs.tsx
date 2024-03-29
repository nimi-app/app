import { POAPToken } from '@nimi.io/card/types';

import { AnimatedSection } from './AnimatedSection';
import { StaticPOAP } from './POAPs';
import { PresentedPOAPsContainer } from './PresentedPOAPsContainer';

export const RecentPOAPs = ({ items }: { items: POAPToken[] }) => (
  <AnimatedSection>
    <PresentedPOAPsContainer>
      {items.slice(0, 6).map((item) => (
        <StaticPOAP key={item.tokenId} src={item.event.image_url} />
      ))}
    </PresentedPOAPsContainer>
  </AnimatedSection>
);
