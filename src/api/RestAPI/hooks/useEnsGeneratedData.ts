import { Nimi } from '@nimi.io/card';
import { useQuery } from '@tanstack/react-query';

import { useRainbow } from '../../../hooks/useRainbow';
import { nimiClient } from '../utils';

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
      ensName,
      chainId: chainId || 1,
    };
    const { data } = await nimiClient.get<{ data: EnsGeneratedDataType }>(`/nimi/generate`, { params });
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
