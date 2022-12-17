import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { DottedBorder } from '../../components/Button/styled';
import { Heading } from '../../components/Heading';

export function NoENSBanner() {
  const { t } = useTranslation('nimi');

  const openENS = () => window.open('https://app.ens.domains/', '_blank')?.focus();

  return (
    <NoENSSection>
      <Heading type="sub">{t('noEnsFound')}</Heading>
      <BuyDomainLink onClick={openENS}>{t('buyDomain')}</BuyDomainLink>
    </NoENSSection>
  );
}

const NoENSSection = styled.section`
  ${DottedBorder}
  display: block;
  width: 100%;
  padding: 40px 0;
  letter-spacing: -0.02em;
  text-align: center;
`;

const BuyDomainLink = styled.a`
  line-height: 24px;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
`;
