import { styled } from 'styled-components';

import { InputProps, SharedInputStyles } from '../../../theme';

export const TextArea = styled.textarea<InputProps>`
  padding: 12px 16px;
  resize: vertical;
  overflow: hidden;
  min-height: 100px;
  ${SharedInputStyles};
`;
