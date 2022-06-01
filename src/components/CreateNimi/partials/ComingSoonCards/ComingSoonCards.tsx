import { useTranslation } from 'react-i18next';
import { Card, CardBodyTextCenter } from '../../styled';

/**
 * Coming soon cards partial
 */
export const ComingSoonCards = () => {
  const { t } = useTranslation('nimi');

  return (
    <>
      <Card variant="blurred">
        <CardBodyTextCenter>
          <p>{t('showcaseYourNFTs')}</p>
          <small>{t('comingSoon')}</small>
        </CardBodyTextCenter>
      </Card>
      <Card variant="blurred">
        <CardBodyTextCenter>
          <p>{t('showcaseYourPOAPs')}</p>
          <small>{t('comingSoon')}</small>
        </CardBodyTextCenter>
      </Card>
    </>
  );
};
