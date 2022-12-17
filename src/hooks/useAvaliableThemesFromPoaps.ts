import { NimiThemeType } from '@nimi.io/card';
import createDebugger from 'debug';
import { useEffect, useState } from 'react';

import { getPOAPAPIClient } from '../modules/poap-services';

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

const debug = createDebugger('hooks:useAvaliableThemesFromPoaps');

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

      // Get all the POAPs for the given account.
      const userPOAPList = (await getPOAPAPIClient().get(`/actions/scan/${account.toLowerCase()}`)).data;

      debug({
        userPOAPList,
      });

      for (const theme of themeToPoapMapping) {
        const hasTheme = userPOAPList.some((poap) => theme.eventId.includes(poap.event.id));
        if (hasTheme) {
          themes.push(theme.theme);
        }
      }

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
