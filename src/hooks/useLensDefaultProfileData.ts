import { GRAPH_ENDPOINT, GraphQlClientDynamic } from '../api/GraphQl/graphClient';
import { useGetDefaultLensProfileQuery } from '../api/GraphQl/schemas/generated/lens';
import { useRainbow } from './useRainbow';
export interface LensDefaultProfileData {
  name: string;
  description: string;
  pictureUrl: string;
}

export function useLensDefaultProfileData(): { loading: boolean; defaultProfileData?: LensDefaultProfileData } {
  const { account, chainId } = useRainbow();
  const { data, isLoading, isFetching } = useGetDefaultLensProfileQuery(
    GraphQlClientDynamic(chainId, GRAPH_ENDPOINT.LENS),
    {
      account,
    },
    {
      select: (data) => {
        if (!data.defaultProfile) return undefined;
        else {
          return {
            name: data.defaultProfile.name,
            description: data.defaultProfile.bio,
            pictureUrl:
              data.defaultProfile.picture && 'uri' in data.defaultProfile?.picture
                ? data.defaultProfile.picture.uri
                : data.defaultProfile.picture?.original.url,
          } as LensDefaultProfileData;
        }
      },
    }
  );

  return { loading: isLoading || isFetching, defaultProfileData: data };
}
