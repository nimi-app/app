import { useEffect, useState } from 'react';
import { NimiThemeType } from '@nimi.io/card';
import axios from 'axios';

export interface UseAvaliableTheme {
  avaliableThemes: NimiThemeType[];
  loading: boolean;
}

const themeToPoapMapping = [
  { theme: NimiThemeType.DEVCON, eventId: [55123, 47553] },
  { theme: NimiThemeType.NIMI, eventId: [536461111111] },
];

/**
 * Does a lookup for an ENS name to find its avatar details, uses ENS Domains metadata API
 */
export function useAvaliableThemesFromPoaps({ account }): UseAvaliableTheme {
  const [avaliableThemes, setAvaliableThemes] = useState<NimiThemeType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPOAPs() {
      setLoading(true);

      const themes: NimiThemeType[] = [];

      const promiseArrays = themeToPoapMapping.map((item) => {
        console.log('primiseItems', item);
        return (
          item.eventId &&
          item.eventId.map((item) => axios.get(`https://api.poap.tech/actions/scan/${account.toLowerCase()}/${item}`))
        );
      });
      console.log('arrayOfApis', promiseArrays);
      const checkIfUserHasPoaps = promiseArrays.map(async (item) => {
        if (item) return await Promise.allSettled(item);
      });
      console.log('check', checkIfUserHasPoaps);
      try {
        // const api = `https://api.poap.tech/actions/scan/${account}/${evenId}`;
      } catch (error) {
        // TODO: HANDLE ERROR
        console.error(error);
      } finally {
        setAvaliableThemes(themes);
        setLoading(false);
      }
    }
    fetchPOAPs();
  }, [account]);

  return {
    loading,
    avaliableThemes,
  };
}
