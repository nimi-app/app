import { styled } from 'styled-components';
import { TailSpin } from 'svg-loaders-react';

export function Spinner() {
  return (
    <Backdrop>
      <TailSpin />
    </Backdrop>
  );
}

const Backdrop = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000bb;
`;
