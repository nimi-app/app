import { Nimi } from '@nimi.io/card';
import { useQuery } from '@tanstack/react-query';

import { useRainbow } from '../../../hooks/useRainbow';
import { baseClient } from '../utils';

interface DeployedNimiPageType {
  publisher: string;
  cid: string | null;
  cidV1: string | null;
  nimi: Nimi;
  createdAt: string;
  updatedAt: string;
  cidV0: string | null;
  id: string;
}

/**
 * Returns query for fetching deployed Nimi page data
 */
export function useDeployedPageData({ ensName }) {
  const { chainId } = useRainbow();

  const getDeployedPageData = async (ensName: string) => {
    const params = {
      ens: ensName,
    };
    const { data } = await baseClient.get<{ data: DeployedNimiPageType[] }>(`/nimi/by`, { params });
    return data;
  };

  return useQuery(['fetchDeployedNimiData', ensName, chainId], async () => await getDeployedPageData(ensName), {
    select: ({ data }) => {
      if (data.length) return data[0];
      else return undefined;
    },
  });
}
