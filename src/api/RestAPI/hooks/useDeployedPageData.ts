import { Nimi } from '@nimi.io/card';
import { useQuery } from '@tanstack/react-query';

import { useRainbow } from '../../../hooks/useRainbow';
import { nimiClient } from '../utils';

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
export function useDeployedPageData(ensName: string) {
  const { chainId } = useRainbow();

  const getDeployedPageData = async () => {
    const params = {
      ens: ensName,
    };

    const { data } = await nimiClient.get<{ data: DeployedNimiPageType[] }>(`/nimi/by`, { params });
    return data;
  };

  return useQuery(['fetchDeployedNimiData', ensName, chainId], getDeployedPageData, {
    select: ({ data }) => {
      if (data.length) return data[0];
      else return undefined;
    },
  });
}
