import { Nimi } from '@nimi.io/card/types';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { MEDIA_WIDTHS } from '../../theme';
import { NimiPreviewCard } from '../CreateNimi/partials/NimiPreviewCard';
import { PageSectionTitle } from '../CreateNimi/styled';

type NimiPreviewProps = {
  nimi: Nimi;
  isContentShown: boolean;
  hideContent: () => void;
};

export function NimiPreview({ nimi, isContentShown, hideContent }: NimiPreviewProps) {
  const { t } = useTranslation('nimi');

  return (
    <Container isContentShown={isContentShown}>
      <BackButton onClick={hideContent}>← Back To Editor</BackButton>
      <PageSectionTitle>{t('preview')}</PageSectionTitle>
      <NimiPreviewCard nimi={nimi} />
    </Container>
  );
}

const Container = styled.aside<{ isContentShown: boolean }>`
  flex: 0 0 400px;
  max-width: 400px;

  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    height: 100vh;
    display: ${({ isContentShown }) => (isContentShown ? 'block' : 'none')};
    overflow: auto;
  }
`;

export const BackButton = styled.button`
  display: none;
  padding: 12px 16px;
  color: #8e85e0;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  background-color: #ffffff;
  box-shadow: 0px 18px 32px -48px rgba(52, 55, 100, 0.06);
  border-radius: 90px;
  border: 1px solid #ffffff;
  margin: auto;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    display: flex;
  }
`;
