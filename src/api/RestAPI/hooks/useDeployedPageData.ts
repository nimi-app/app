import { Nimi } from '@nimi.io/card/types';
import { useQuery } from '@tanstack/react-query';

import { useRainbow } from '../../../hooks/useRainbow';
import { nimiClient } from '../utils';

interface NimiSnapshot {
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
    const { data } = await nimiClient.get<{
      data: {
        ipns?: string;
        nimi?: NimiSnapshot;
      };
    }>(`/ens/has-nimi-ipns`, {
      params: {
        domain: ensName,
      },
    });
    return data;
  };

  return useQuery(['fetchDeployedNimiData', ensName, chainId], getDeployedPageData, {
    select: ({ data }) => {
      return data;
    },
  });
}
