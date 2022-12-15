import { Nimi } from '@nimi.io/card';
import { useQuery } from '@tanstack/react-query';

import { useRainbow } from '../../../hooks/useRainbow';
import { baseClient } from '../utils';

interface EnsGeneratedDataType {
  nimi: Nimi;
}
interface EnsGeneratedType {
  ensName: string;
  shouldRunSecondQuery?: boolean;
}
/**
 * Returns query for fetching data generated from ens name
 */
export function useEnsGeneratedData({ ensName, shouldRunSecondQuery = false }: EnsGeneratedType) {
  const { chainId } = useRainbow();
  const getEnsGenratedData = async (ensName: string, chainId = 1) => {
    const params = {
      ensName,
      chainId,
    };
    const { data } = await baseClient.get<{ data: EnsGeneratedDataType }>(`/nimi/generate`, { params });
    return data;
  };

  return useQuery(['fetchEnsGeneratedData', ensName, chainId], async () => await getEnsGenratedData(ensName, chainId), {
    select: ({ data }) => {
      if (data.nimi) return data.nimi;
      else return undefined;
    },
    enabled: shouldRunSecondQuery,
  });
}
