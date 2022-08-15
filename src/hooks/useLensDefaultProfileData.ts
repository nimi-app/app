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
  console.log('jere');

  const { activeNetwork } = useActiveNetwork();
  const lensSubgraph = useLensSubgraphClient();
  console.log('acctount', account);
  const { data, loading, error } = useGetDefaultLensProfileQuery({
    client: lensSubgraph,
    variables: {
      account,
    },
  });

  console.log('here', error);

  const [defaultProfileData, setDefaultProfileData] = useState<LensDefaultProfileData | null>(null);
  console.log('here');

  useEffect(() => {
    console.log('herer', data, error);
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
