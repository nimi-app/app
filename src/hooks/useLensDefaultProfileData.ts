import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useActiveWeb3React } from './useWeb3';
import { useLensSubgraph } from './useLensSubgraph';

const LENS_DEFAULT_PROFILE_QUERY = gql`
  query getDefaultProfile($account: EthereumAddress!) {
    defaultProfile(request: { ethereumAddress: $account }) {
      name
      bio
      picture {
        ... on NftImage {
          uri
        }
        ... on MediaSet {
          original {
            url
          }
        }
      }
    }
  }
`;

interface LensQueryResult {
  defaultProfile: {
    name: string;
    bio: string;
    picture: { uri: string } | { original: { url: string } };
  } | null;
}

export interface LensDefaultProfileData {
  name: string;
  description: string;
  pictureUrl: string;
}

export function useLensDefaultProfileData(): { loading: boolean; defaultProfileData: LensDefaultProfileData | null } {
  const { account } = useActiveWeb3React();
  const lensSubgraph = useLensSubgraph();

  const [loading, setLoading] = useState(false);
  const [defaultProfileData, setDefaultProfileData] = useState<LensDefaultProfileData | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      if (!!!account) return;
      if (!cancelled) setLoading(true);
      const {
        data: { defaultProfile },
      } = await lensSubgraph.query<LensQueryResult>({
        query: LENS_DEFAULT_PROFILE_QUERY,
        variables: { account },
      });
      if (!cancelled) setLoading(false);
      if (!cancelled)
        setDefaultProfileData(
          defaultProfile
            ? {
                name: defaultProfile.name,
                description: defaultProfile.bio,
                pictureUrl:
                  'uri' in defaultProfile.picture ? defaultProfile.picture.uri : defaultProfile.picture.original.url,
              }
            : null
        );
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [lensSubgraph, account]);

  return { loading, defaultProfileData };
}
