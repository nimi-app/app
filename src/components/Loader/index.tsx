import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn)
  }
`;

interface LoaderProps {
  size?: number;
}

const StyledSVG = styled.svg`
  animation: 1.5s ${rotate} linear infinite;
`;

/**
 * Default Loader Wrapper
 */
export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  width: 100%;
`;

export function Loader({ size = 36 }: LoaderProps) {
  return (
    <StyledSVG width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="18" cy="18" r="17" strokeWidth="1.5" stroke="#fff" strokeOpacity="1"></circle>
        <circle cx="18" cy="18" r="17" stroke="url(#spinner_gradient)" strokeWidth="1.5"></circle>
      </g>
      <defs>
        <linearGradient id="spinner_gradient" x1="36" y1="18" x2="24.75" y2="22.25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B83AF3"></stop>
          <stop offset="0.78125" stopColor="#0D42FF" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </StyledSVG>
  );
}
