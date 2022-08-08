import styled from 'styled-components';

export const TextArea = styled.textarea`
  font: inherit;
  padding: 12px 16px;
  border: 2px solid #e6e8ec;
  border-radius: 12px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #b1b5c3;
  }
  width: 100%;
  resize: vertical;
  overflow: hidden;
`;
