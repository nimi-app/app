import styled from 'styled-components';

import { PresentedPOAPsContainer } from './PresentedPOAPsContainer';
import { NoPOAP } from './POAPs';

export const NoPOAPs = () => (
  <PresentedPOAPsContainer>
    {new Array(6).fill(null).map((_, index) => (
      <NoPOAP key={index} />
    ))}
    <Text>No POAPs Found on this wallet</Text>
  </PresentedPOAPsContainer>
);

const Text = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 111;
  transform: translate(-50%, -50%);
  line-height: 20px;
  font-size: 18px;
  color: #040d18;
  text-align: center;
`;
