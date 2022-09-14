import styled, { css } from 'styled-components';

const POAPsSharedStyling = css`
  width: 108px;
  height: 108px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(8px);
  box-shadow: 0px 14px 24px rgba(52, 55, 100, 0.12);
  margin-right: -28px;
`;

export const PreloaderPOAP = styled.div`
  ${POAPsSharedStyling}
  background-color: #F1F2F5;
`;

type StaticPOAPProps = {
  marginRight?: string;
  cursorPointer?: boolean;
  zIndex?: number;
};

export const StaticPOAP = styled.img<StaticPOAPProps>`
  ${POAPsSharedStyling}

  ${({ marginRight }) => marginRight && `margin-right: ${marginRight};`}
  ${({ cursorPointer }) => cursorPointer && 'cursor: pointer;'}
  ${({ zIndex }) => zIndex && `z-index: ${zIndex};`}
`;

export const POAPPlaceholder = styled.div<{ zIndex: number }>`
  ${POAPsSharedStyling}
  border: 1px dashed #ccc7c7;

  ${({ zIndex }) => zIndex && `z-index: ${zIndex};`}
`;
