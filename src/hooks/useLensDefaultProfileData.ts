import { useEffect, useState } from 'react';

import { useGetDefaultLensProfileQuery } from '../generated/graphql/lens';
import { useLensSubgraphClient } from './useLensSubgraph';
import { ActiveNetworkState, useActiveNetwork } from '../context/ActiveNetwork';

export interface LensDefaultProfileData {
  name: string;
  description: string;
  pictureUrl: string;
}

export function useLensDefaultProfileData(account): {
  loading: boolean;
  defaultProfileData: LensDefaultProfileData | null;
} {
  const { activeNetwork } = useActiveNetwork();
  const lensSubgraph = useLensSubgraphClient();

  const { data, loading, error } = useGetDefaultLensProfileQuery({
    client: lensSubgraph,
    variables: {
      account,
    },
  });

  const [defaultProfileData, setDefaultProfileData] = useState<LensDefaultProfileData | null>(null);

  useEffect(() => {
    if (!data || !account) return;
    setDefaultProfileData(
      data.defaultProfile &&
        data.defaultProfile.name &&
        data.defaultProfile.bio &&
        data.defaultProfile.picture &&
        activeNetwork === ActiveNetworkState.ETHEREUM &&
        !error
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
  }, [data, account, activeNetwork, error]);

  return { loading, defaultProfileData };
}
