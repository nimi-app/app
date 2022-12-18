import { useQuery } from '@tanstack/react-query';

import { getPOAPAPIClient } from '../utils';

type Poap = {
  city: string;
  country: string;
  desciption: string;
  end_date: string;
  event_url?: string;
  expiry_date: string;
  fancy_id: string;
  id: number;
  image_url: string;
  name: string;
  start_date: string;
  supply: number;
  year: number;
};

export interface PoapData {
  chain: string;
  created: string;
  event: Poap;
  owner: string;
  tokenId: string;
}

/**
 * Returns query for fetching poaps user owns
 */
export function usePoapsFromUser(account: string) {
  const getPoapsFromUser = async (account: string) => {
    const poapClient = getPOAPAPIClient();
    const { data } = await poapClient.get<PoapData[]>(`/actions/scan/${account.toLowerCase()}`);
    return data;
  };

  return useQuery(['fetchUserPoaps', account], async () => await getPoapsFromUser(account), {});
}
