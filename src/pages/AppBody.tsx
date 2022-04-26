import styled from 'styled-components';

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 432px;
  width: 100%;
  border-radius: 12px;
  padding: 12px;
`;

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export function AppBody({ children }) {
  return <BodyWrapper>{children}</BodyWrapper>;
}
