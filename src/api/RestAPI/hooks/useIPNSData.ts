import { Nimi } from '@nimi.io/card/types';
import { validateNimi } from '@nimi.io/card/validators';
import { useQuery } from '@tanstack/react-query';

import { useRainbow } from '../../../hooks/useRainbow';
import { getNimiAPIClient } from '../utils';

export interface ENSMetadata {
  uri: string;
  image: string;
}

interface NimiSnapshot {
  publisher: string;
  cid: string | null;
  nimi: Nimi;
  createdAt: string;
  updatedAt: string;
  id: string;
}
const validatedNimiSilent = (nimi: Nimi) => {
  try {
    const validatedNimi = validateNimi(nimi);
    return validatedNimi;
  } catch (error) {
    return false;
  }
};

/**
 * Returns query for fetching data generated from ens name
 */
export function useIPNSData(ensName: string) {
  const { chainId } = useRainbow();

  const getIPNSdata = async () => {
    const { data } = await getNimiAPIClient().get<{
      data: {
        ipns?: string;
        nimi?: NimiSnapshot;
      };
    }>(`/ens/has-nimi-ipns?name=${ensName}&chainId=${chainId}`);

    return data.data;
  };

  return useQuery(['fetchIPNSDATA', ensName, chainId], getIPNSdata, {
    select: (data) => {
      if (data.ipns && data.nimi && validatedNimiSilent(data.nimi.nimi) !== false) {
        return data;
      } else return undefined;
    },
  });
}
