import { PresentedPOAPsContainer } from './PresentedPOAPsContainer';
import { PreloaderPOAP } from './POAPs';

export const PreloaderPOAPs = () => (
  <PresentedPOAPsContainer>
    {new Array(6).fill(null).map((_, index) => (
      <PreloaderPOAP key={index} />
    ))}
  </PresentedPOAPsContainer>
);
