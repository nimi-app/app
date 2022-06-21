import { useEffect, useState } from 'react';
import { useActiveWeb3React } from './useWeb3';
import { useGetDefaultLensProfileQuery } from '../generated/graphql/lens';
import { useLensSubgraphClient } from './useLensSubgraph';

export interface LensDefaultProfileData {
  name: string;
  description: string;
  pictureUrl: string;
}

export function useLensDefaultProfileData(): { loading: boolean; defaultProfileData: LensDefaultProfileData | null } {
  const { account } = useActiveWeb3React();
  const lensSubgraph = useLensSubgraphClient();
  const { data, loading } = useGetDefaultLensProfileQuery({
    client: lensSubgraph,
    variables: {
      account,
    },
  });

  const [defaultProfileData, setDefaultProfileData] = useState<LensDefaultProfileData | null>(null);

  useEffect(() => {
    if (!data) return;
    setDefaultProfileData(
      data.defaultProfile && data.defaultProfile.name && data.defaultProfile.bio && data.defaultProfile.picture
        ? {
            name: data.defaultProfile.name,
            description: data.defaultProfile.bio,
            pictureUrl:
              'uri' in data.defaultProfile.picture
                ? data.defaultProfile.picture.uri
                : data.defaultProfile.picture?.original.url,
          }
        : null
    );
  }, [data, account]);

  return { loading, defaultProfileData };
}
