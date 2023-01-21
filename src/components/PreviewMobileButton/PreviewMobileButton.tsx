import styled from 'styled-components';

import { MEDIA_WIDTHS, NimiSignatureColor } from '../../theme';

export function PreviewMobileButton({ onClick }: { onClick: () => void }) {
  return <PreviewMobile onClick={onClick}>PREVIEW PROFILE</PreviewMobile>;
}

export const PreviewMobile = styled.div`
  display: none;
  flex: 1;
  ${NimiSignatureColor};
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  justify-content: center;

  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    display: flex;
  }
`;
