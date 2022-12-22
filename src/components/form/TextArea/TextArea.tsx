import styled from 'styled-components';

import { SharedInputStyles } from '../../../theme';

export const TextArea = styled.textarea`
  padding: 12px 16px;
  resize: vertical;
  overflow: hidden;
  min-height: 100px;
  ${SharedInputStyles};
`;
