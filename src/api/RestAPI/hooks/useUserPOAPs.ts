import { POAPToken } from '@nimi.io/card/types';
import { useQuery } from '@tanstack/react-query';

import { getPOAPAPIClient } from '../utils';

export async function fetchUserPOAPs(account: string) {
  const poapClient = getPOAPAPIClient();
  const { data } = await poapClient.get<POAPToken[]>(`/actions/scan/${account.toLowerCase()}`);
  return data;
}

/**
 * Returns query for fetching poaps user owns
 */
export function useUserPOAPs(account?: string) {
  const getPoapsFromUser = async () => {
    if (!account) return [];
    return fetchUserPOAPs(account);
  };

  return useQuery(['fetchUserPoaps', account], getPoapsFromUser);
}
