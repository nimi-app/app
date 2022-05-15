import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import {
  StyledENSNameCardWrapper,
  StyledDomainNameWrapper,
  StyledExternalLink,
  ENSNameCardImage,
  StyledDomainName,
} from './styleds';

export interface ENSNameCardProps {
  name: string;
  imageUrl?: string;
  labelName: string;
}

interface ENSDomainNameProps {
  name: string;
}

const DomainName: FC<ENSDomainNameProps> = ({ name }) => (
  <StyledDomainNameWrapper>
    <StyledDomainName>{name}</StyledDomainName>
  </StyledDomainNameWrapper>
);

export function ENSNameCard({ name, labelName, imageUrl }: ENSNameCardProps) {
  const { t } = useTranslation();

  const domainLength = name.length;
  const domainHref = name ? `https://${name}.limo` : `https://${labelName}.eth.limo`;

  return (
    <StyledENSNameCardWrapper>
      {imageUrl && <ENSNameCardImage alt={imageUrl} src={imageUrl} />}
      <DomainName name={name} />
      <Button>{t('setupANimiProfile')}</Button>
      <StyledExternalLink
        href={domainHref}
        title={t('goToDomainName', {
          domainName: name || labelName,
        })}
        target="_blank"
        rel="noopener noreferrer"
      >
        {domainLength < 20
          ? t('goToDomainName', {
              domainName: name || labelName,
            })
          : t('viewThisDomain')}
      </StyledExternalLink>
    </StyledENSNameCardWrapper>
  );
}
