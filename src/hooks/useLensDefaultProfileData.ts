import { useEffect, useState } from 'react';
import { useActiveWeb3React } from './useWeb3';
import { useGetDefaultLensProfileQuery } from '../api/GraphQl/schemas/generated/lens';
import { GraphQlClientDynamic, GRAPH_ENDPOINT } from '../api/GraphQl/graphClient';

export interface LensDefaultProfileData {
  name: string;
  description: string;
  pictureUrl: string;
}

export function useLensDefaultProfileData(): { loading: boolean; defaultProfileData: LensDefaultProfileData | null } {
  const { account, chainId } = useActiveWeb3React();

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
