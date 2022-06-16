import { FC } from 'react';
import PurpleCircle from '../../assets/svg/purpleCircle.svg';
import { useNavigate } from 'react-router-dom';

import { StyledENSNameCardWrapper, StyledDomainNameWrapper, ENSNameCardImage, StyledDomainName } from './styleds';

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

export function ENSNameCard({ name, labelName, imageUrl = PurpleCircle }: ENSNameCardProps) {
  const navigate = useNavigate();

  const handleSubmit = () => navigate(`/domains/${name}`);
  // const domainLength = name.length;
  // const domainHref = name ? `https://${name}.limo` : `https://${labelName}.eth.limo`;

  return (
    <StyledENSNameCardWrapper onClick={handleSubmit}>
      <ENSNameCardImage alt={imageUrl} src={imageUrl} />
      <DomainName name={name} />
      {/* <StyledExternalLink
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
      </StyledExternalLink> */}
    </StyledENSNameCardWrapper>
  );
}
