import { useEffect, useState } from 'react';
import { NimiThemeType } from '@nimi.io/card';
import axios from 'axios';

export interface UseAvaliableTheme {
  avaliableThemes: NimiThemeType[];
  loading: boolean;
}

//Order here determines precedent for default theme
const themeToPoapMapping = [
  { theme: NimiThemeType.DEVCON, eventId: [60695, 73449] },
  { theme: NimiThemeType.RAAVE, eventId: [63182] },
  { theme: NimiThemeType.DAIVINITY, eventId: [74051] },
];

/**
 * Returns array of themes user has avaliable
 */
export function useAvaliableThemesFromPoaps({ account }): UseAvaliableTheme {
  const [avaliableThemes, setAvaliableThemes] = useState<NimiThemeType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPOAPs() {
      setLoading(true);

      //Default theme set here
      const themes: NimiThemeType[] = [NimiThemeType.NIMI];

      //array of requests for checking if user has poap
      const poapRequestsForIndividualPoaps = themeToPoapMapping.map((item) => {
        return (
          item.eventId &&
          item.eventId.map((item) => axios.get(`https://api.poap.tech/actions/scan/${account.toLowerCase()}/${item}`))
        );
      });
      //resolve promises
      const resolvedPoapRequests = await Promise.all(
        poapRequestsForIndividualPoaps.map(async (item) => {
          if (item) return await Promise.allSettled(item);
        })
      );
      //sorted array of avaliable themes based on requests
      resolvedPoapRequests.forEach((item, index) => {
        const hasTheme = item && item.some((item) => item.status === 'fulfilled');
        if (hasTheme) themes.unshift(themeToPoapMapping[index].theme);
      });
      console.log('themearary', themes);

      setAvaliableThemes(themes);
      setLoading(false);
    }
    if (account) fetchPOAPs();
  }, [account]);

  return {
    loading,
    avaliableThemes,
  };
}
