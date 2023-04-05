import { NimiThemeType, POAPEvent } from '@nimi.io/card';
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

const eventUrlToThemeMapping = {
  ['https://nimi.io/']: NimiThemeType.RAAVE,
};

/**
 * Fetches POAP event data
 * @param eventId
 * @returns
 */
export function usePOAPEventQuery(eventId?: string) {
  const getPoapsFromUser = async () => {
    if (!eventId) return undefined;
    const data = await createPOAPClient(process.env.REACT_APP_POAP_API_KEY as string).get<POAPEvent>(
      `/events/id/${eventId}`
    );
    return data.data;
  };

  return useQuery(['fetchPOAPEvent', eventId], getPoapsFromUser, {
    enabled: !!eventId,
    select: (data) => {
      if (data) {
        const { image_url, event_url, expiry_date } = data;
        const theme = eventUrlToThemeMapping[event_url];
        const isExpired = new Date(expiry_date).getTime() < new Date().getTime();

        return {
          image_url,
          theme,
          isExpired,
        };
      } else return undefined;
    },
  });
}

export function useUserHasPOAPQuery({ account, eventId, enabled }: { account?: string; eventId?: string; enabled }) {
  const getPoapsFromUser = async () => {
    const { data } = await createPOAPClient(process.env.REACT_APP_POAP_API_KEY as string).get<{ owner: string }>(
      `actions/scan/${account}/${eventId}`
    );
    return data;
  };

  return useQuery(['fetchIfUserHasPoap', account, eventId], getPoapsFromUser, {
    onError: (error) => {
      console.log('error', error);
    },
    enabled: enabled && !!account && !!eventId,
    retry: false,
  });
}
