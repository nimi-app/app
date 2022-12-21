import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import PurpleCircle from '../../../assets/svg/purpleCircle.svg';
import { useENSMetadata } from '../../../hooks/useENSMetadata';
import { useGetENSDomainsByAddress } from '../../../hooks/useGetENSDomainsByAddress';
import { useNimiData } from '../../../hooks/useNimiData';
import { ENSNameCardImage, StyledDomainName, StyledENSNameCardWrapper } from '../styleds';

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never;

export interface ENSCardContainerProps {
  domain: ArrElement<ReturnType<typeof useGetENSDomainsByAddress>['data']>;
}

export function ENSCardContainer({ domain }: ENSCardContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const { data: metadata, loading: metadataLoading } = useENSMetadata(domain.name!);
  const { data: domainData } = useNimiData(domain?.name, isInView);

  if (domainData !== null && domainData !== undefined) {
    return (
      <Link to={`/domains/${domainData.nimi.ensName}`} state={domainData}>
        <StyledENSNameCardWrapper>
          <ENSNameCardImage
            alt={domainData.nimi.ensAddress}
            src={domainData.nimi.image ? domainData.nimi.image.url : PurpleCircle}
          />
          <StyledDomainName>{domainData.nimi.ensName}</StyledDomainName>;
        </StyledENSNameCardWrapper>
      </Link>
    );
  }

  return (
    <Link ref={ref} to={`/domains/${domain.name}`}>
      <StyledENSNameCardWrapper>
        <ENSNameCardImage
          alt={'ENS Name image'}
          src={metadataLoading ? PurpleCircle : metadata ? metadata.image : PurpleCircle}
          onError={(event) => {
            const target = event.target as HTMLImageElement;
            if (target.src !== PurpleCircle) {
              target.src = PurpleCircle;
            }
          }}
        />
        <StyledDomainName>{domain.name}</StyledDomainName>
      </StyledENSNameCardWrapper>
    </Link>
  );
}
