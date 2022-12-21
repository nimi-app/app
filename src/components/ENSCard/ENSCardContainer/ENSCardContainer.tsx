import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import purpleCircleURL from '../../../assets/svg/purpleCircle.svg';
import { useENSMetadata } from '../../../hooks/useENSMetadata';
import { useGetENSDomainsByAddress } from '../../../hooks/useGetENSDomainsByAddress';
import { useNimiData } from '../../../hooks/useNimiData';
import { PopulatedENSCard } from '../PopulatedENSCard';
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
    return <PopulatedENSCard data={domainData.nimi} key={domain.id} id={domain.id} />;
  }

  return (
    <Link ref={ref} to={`/domains/${domain.name}`}>
      <StyledENSNameCardWrapper>
        <ENSNameCardImage
          alt={'ENS Name image'}
          src={metadataLoading ? purpleCircleURL : metadata ? metadata.image : purpleCircleURL}
          onError={(event) => {
            const target = event.target as HTMLImageElement;
            if (target.src !== purpleCircleURL) {
              target.src = purpleCircleURL;
            }
          }}
        />
        <StyledDomainName>{domain.name}</StyledDomainName>
      </StyledENSNameCardWrapper>
    </Link>
  );
}
