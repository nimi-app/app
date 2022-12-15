import { useQuery } from '@tanstack/react-query';
import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

import { getDeployedPageData } from '../../../api/RestAPI/apiService';
import purpleCircleURL from '../../../assets/svg/purpleCircle.svg';
import { useENSMetadata } from '../../../hooks/useENSMetadata';
import { useGetENSDomainsByAddress } from '../../../hooks/useGetENSDomainsByAddress';
import { ENSNameCardImage, StyledDomainName, StyledENSNameCardWrapper } from '../styleds';

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never;

export interface ENSCardContainerProps {
  domain: ArrElement<ReturnType<typeof useGetENSDomainsByAddress>['data']>;
}

export function ENSCardContainer({ domain }: ENSCardContainerProps) {
  const { data: metadata, loading: metadataLoading } = useENSMetadata(domain.name!);

  const ref = useRef(null);

  const {
    data: deployedNimi,
    isLoading: isDelpoyedLoading,
    isSuccess: isDeployedSuccess,
  } = useQuery({
    queryKey: ['deployedPage', domain.name],
    queryFn: async () => await getDeployedPageData(domain.name),
    select: ({ data }) => data[0],
  });

  const nimiImage = useMemo(() => {
    if (!isDelpoyedLoading && isDeployedSuccess && deployedNimi && deployedNimi.nimi && deployedNimi.nimi.image)
      return deployedNimi.nimi.image.url as string;
  }, [deployedNimi, isDelpoyedLoading, isDeployedSuccess]);

  const metaDataImage = useMemo(() => {
    if (metadata && !metadataLoading) return metadata.image;
  }, [metadataLoading, metadata]);

  return (
    <Link ref={ref} to={`/domains/${domain.name}`}>
      <StyledENSNameCardWrapper>
        <ENSNameCardImage
          alt={'ENS Name image'}
          src={nimiImage ? nimiImage : metaDataImage ? metaDataImage : purpleCircleURL}
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
