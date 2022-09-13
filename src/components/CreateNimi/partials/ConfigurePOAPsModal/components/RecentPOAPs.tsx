import { AnimatedSection } from './AnimatedSection';
import { PresentedPOAPsContainer } from './PresentedPOAPsContainer';
import { StaticPOAP } from './POAPs';

export const RecentPOAPs = ({ items }) => (
  <AnimatedSection>
    <PresentedPOAPsContainer>
      {items.slice(0, 6).map((item) => (
        <StaticPOAP key={item.tokenId} src={item.event.image_url} />
      ))}
    </PresentedPOAPsContainer>
  </AnimatedSection>
);
