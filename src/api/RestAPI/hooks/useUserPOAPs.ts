import { createPOAPClient, fetchUserPOAPs } from '@nimi.io/card/api';
import { useQuery } from '@tanstack/react-query';

/**
 * Returns query for fetching poaps user owns
 */
export function useUserPOAPs(account?: string) {
  const getPoapsFromUser = async () => {
    if (!account) return [];
    return fetchUserPOAPs(createPOAPClient(process.env.REACT_APP_POAP_API_KEY as string), account);
  };

  return useQuery(['fetchUserPoaps', account], getPoapsFromUser);
}
