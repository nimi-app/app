import { styled } from 'styled-components';

import { NimiModalStyles } from '../../../../theme';

export const PoapButton = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  gap: 10px;
  font-weight: 600;
  font-size: 16px;
  color: #a78aff;
  letter-spacing: 0.1em;
  line-height: 24px;
  margin-left: 10px;
  align-items: center;
`;

export const PoapWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 15px 20px 15px 37px;
  border-radius: 12px;
  background-color: #f1f1f1;
  ${NimiModalStyles};
`;

export const InnerPoapWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 5px 6px;
  border-radius: 20px;
  background-color: #ffffff;
`;
