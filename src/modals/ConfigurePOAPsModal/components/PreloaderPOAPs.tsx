import { PreloaderPOAP } from './POAPs';
import { PresentedPOAPsContainer } from './PresentedPOAPsContainer';

export const PreloaderPOAPs = () => (
  <PresentedPOAPsContainer>
    {new Array(6).fill(null).map((_, index) => (
      <PreloaderPOAP key={index} />
    ))}
  </PresentedPOAPsContainer>
);
