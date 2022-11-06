import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion/dist/framer-motion';

import { useGetENSDomainsByAddress } from '../../../hooks/useGetENSDomainsByAddress';
import { PopulatedENSCard } from '../PopulatedENSCard';
import { ENSNameCardImage, StyledDomainName, StyledENSNameCardWrapper } from '../styleds';
import purpleCircleURL from '../../../assets/svg/purpleCircle.svg';
import { useENSMetadata } from '../../../hooks/useENSMetadata';
import { fetchNimiDataByENSName } from '../../../modules/api-service';

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never;

export interface ENSCardContainerProps {
  domain: ArrElement<ReturnType<typeof useGetENSDomainsByAddress>['data']>;
}

export function ENSCardContainer({ domain }: ENSCardContainerProps) {
  const { data: metadata, loading: metadataLoading } = useENSMetadata(domain.name!);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [domainData, setDomainData] = useState<Awaited<ReturnType<typeof fetchNimiDataByENSName>> | null>();

  // When element is in view, fetch the data
  useEffect(() => {
    // fetch only if not already fetched
    if (isInView && domain?.name && domainData === undefined) {
      fetchNimiDataByENSName(domain.name)
        .then((data) => {
          setDomainData(data);
        })
        // Ignore error
        .catch((error) => {
          console.log('ENSCardContainer: useEffect', error);
          setDomainData(null);
        });
    }
  }, [isInView, domain.name, domainData]);

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
