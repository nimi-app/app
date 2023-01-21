import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button } from '../Button';

export function PublishNimiButton() {
  const { t } = useTranslation('nimi');

  return <StyledButton type="submit">{t('publishSite')}</StyledButton>;
}

export const StyledButton = styled(Button)`
  background: linear-gradient(291.35deg, #4368ea -25.85%, #c490dd 73.38%);
  opacity: 0.8;
  border-radius: 50px;
  padding: 25px 24px;
  letter-spacing: -0.02em;
  width: 100%;
`;
