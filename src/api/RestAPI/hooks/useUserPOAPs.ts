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

export function usePoapTokens(eventId?: string) {
  const getPoapsFromUser = async () => {
    if (!eventId) return undefined;
    const data = await createPOAPClient(process.env.REACT_APP_POAP_API_KEY as string).get<{ image_url: string }>(
      `/events/id/${eventId}`
    );

    return data;
  };

  return useQuery(['fetchPoaps', eventId], getPoapsFromUser, {
    enabled: !!eventId,
  });
}

export function useCheckIfUserHasPaopEvent({
  account,
  eventId,
  enabled,
}: {
  account?: string;
  eventId?: string;
  enabled;
}) {
  const getPoapsFromUser = async () => {
    if (!account || !eventId) return undefined;
    const { data } = await createPOAPClient(process.env.REACT_APP_POAP_API_KEY as string).get<{ owner: string }>(
      `actions/scan/${account}/${eventId}`
    );
    console.log('data', data);
    return data;
  };

  return useQuery(['fetchIfUserHasPoap', account, eventId], getPoapsFromUser, {
    onError: (error) => {
      console.log('error', error);
    },

    enabled,
    retry: false,
  });
}
