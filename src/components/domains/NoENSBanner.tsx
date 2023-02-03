import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { DottedBorder } from '../Button/styled';
import { Heading } from '../Heading';

type NoENSBannerProps = {
  openENSWebsiteHandler: () => void;
};

export function NoENSBanner({ openENSWebsiteHandler }: NoENSBannerProps) {
  const { t } = useTranslation('nimi');

  return (
    <NoENSSection>
      <Heading type="sub">{t('noEnsFound')}</Heading>
      <BuyDomainLink onClick={openENSWebsiteHandler}>{t('buyDomain')}</BuyDomainLink>
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
