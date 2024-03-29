import { useRainbow } from './useRainbow';
import { getGraphQLClient, GRAPH_ENDPOINT } from '../api/GraphQl/graphClient';
import { useGetDefaultLensProfileQuery } from '../api/GraphQl/schemas/generated/lens';
export interface LensDefaultProfileData {
  name: string;
  description: string;
  pictureUrl: string;
}

export function useLensDefaultProfileData(): { loading: boolean; defaultProfileData?: LensDefaultProfileData } {
  const { account, chainId } = useRainbow();

  const { data, isLoading, isFetching } = useGetDefaultLensProfileQuery(
    getGraphQLClient(GRAPH_ENDPOINT.LENS, chainId),
    {
      account,
    },
    {
      select: ({ defaultProfile }) => {
        if (!defaultProfile) return undefined;
        else {
          return {
            name: defaultProfile.name,
            description: defaultProfile.bio,
            pictureUrl:
              defaultProfile.picture && 'uri' in defaultProfile?.picture
                ? defaultProfile.picture.uri
                : defaultProfile.picture?.original.url,
          } as LensDefaultProfileData;
        }
      },
    }
  );

  return { loading: isLoading || isFetching, defaultProfileData: data };
}
