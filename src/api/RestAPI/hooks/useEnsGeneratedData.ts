import { Nimi } from '@nimi.io/card/types';
import { useQuery } from '@tanstack/react-query';

import { useRainbow } from '../../../hooks/useRainbow';
import { getNimiAPIClient } from '../utils';

interface EnsGeneratedDataType {
  nimi: Nimi;
}

/**
 * Returns query for fetching data generated from ens name
 */
export function useEnsGeneratedData(ensName: string, enabled = true) {
  const { chainId } = useRainbow();

  const getEnsGenratedData = async () => {
    const params = {
      name: ensName,

      chainId: chainId || 1,
    };
    const { data } = await getNimiAPIClient().get<{ data: EnsGeneratedDataType }>(`/nimi/generate`, { params });
    return data;
  };

  return useQuery(['fetchEnsGeneratedData', ensName, chainId], getEnsGenratedData, {
    select: ({ data }) => {
      if (data.nimi) return data.nimi;
      else return undefined;
    },
    enabled,
  });
}
