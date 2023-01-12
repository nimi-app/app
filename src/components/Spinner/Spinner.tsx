import { RotatingLines } from 'react-loader-spinner';
import styled from 'styled-components';

export function Spinner() {
  return (
    <Backdrop>
      <RotatingLines width="150" strokeColor="#ffffff99" strokeWidth="5" />
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
