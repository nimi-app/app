import { useEffect, useState } from 'react';

import { GRAPH_ENDPOINT, GraphQlClientDynamic } from '../api/GraphQl/graphClient';
import { useGetDefaultLensProfileQuery } from '../api/GraphQl/schemas/generated/lens';
import { useRainbow } from './useRainbow';
export interface LensDefaultProfileData {
  name: string;
  description: string;
  pictureUrl: string;
}

export function useLensDefaultProfileData(): { loading: boolean; defaultProfileData: LensDefaultProfileData | null } {
  const { account, chainId } = useRainbow();
  const { data, isLoading } = useGetDefaultLensProfileQuery(GraphQlClientDynamic(chainId, GRAPH_ENDPOINT.LENS), {
    account,
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

  return { loading: isLoading, defaultProfileData };
}
