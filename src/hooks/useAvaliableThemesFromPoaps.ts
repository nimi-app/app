import { NimiThemeType } from '@nimi.io/card';
import createDebugger from 'debug';

import { PoapData, usePoapsFromUser } from '../api/RestAPI/hooks/usePoapsFromUser';

export interface UseAvaliableTheme {
  avaliableThemes: NimiThemeType[];
  isLoading: boolean;
  hasPoaps: boolean;
}

//Order determines precedent for default theme
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
  const { data, isLoading, isFetching } = usePoapsFromUser(account);

  function getAvaliableThemes(userPOAPList?: PoapData[]) {
    const themes: NimiThemeType[] = [NimiThemeType.NIMI];

    if (userPOAPList) {
      for (const theme of themeToPoapMapping) {
        const hasTheme = userPOAPList.some((poap) => theme.eventId.includes(poap.event.id));
        if (hasTheme) {
          themes.push(theme.theme);
        }
      }
    }

    return themes;
  }
  debug({ poapData: data });

  return {
    isLoading: isLoading || isFetching,
    avaliableThemes: getAvaliableThemes(data),
    hasPoaps: data ? data.length !== 0 : false,
  };
}
