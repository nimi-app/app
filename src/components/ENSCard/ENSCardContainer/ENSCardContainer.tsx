import { useQuery } from '@tanstack/react-query';
import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useEnsAvatar } from 'wagmi';

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
  console.log('metadata', metadata);

  const ref = useRef(null);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['deployedPage', domain.name],
    queryFn: async () => await getDeployedPageData(domain.name),
    select: ({ data }) => data[0],
  });

  const nimiImageExists = useMemo(() => {
    if (!isLoading && isSuccess && data && data.nimi && data.nimi.image) return true;
    else return false;
  }, [data, isLoading, isSuccess]);
  console.log('nimiImageExists', nimiImageExists);

  return (
    <Link ref={ref} to={`/domains/${domain.name}`}>
      <StyledENSNameCardWrapper>
        <ENSNameCardImage
          alt={'ENS Name image'}
          src={
            metadataLoading || isLoading
              ? purpleCircleURL
              : nimiImageExists
              ? data.nimi.image.url
              : metadata
              ? metadata.image
              : purpleCircleURL
          }
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
