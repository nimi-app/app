import { NimiThemeType, POAPToken } from '@nimi.io/card/types';
import createDebugger from 'debug';

import { usePoapsFromUser } from '../api/RestAPI/hooks/usePoapsFromUser';
import { NimiCuratedTheme } from '../types';

export interface UseAvaliableTheme {
  avaliableThemes: NimiCuratedTheme[];
  isLoading: boolean;
  hasPoaps: boolean;
}

//Order determines precedent for default theme
const themeToPoapMapping: { theme: NimiCuratedTheme; eventId: number[] }[] = [
  { theme: NimiThemeType.DEVCON, eventId: [60695, 73449] },
  { theme: NimiThemeType.RAAVE, eventId: [63182] },
  { theme: NimiThemeType.DAIVINITY, eventId: [74051] },
];

/**
 * Returns array of themes user has available available Themes
 * @param userPOAPList
 * @returns
 */
export function getAvailableThemesByPOAPs(userPOAPList?: POAPToken[]) {
  const themes: NimiCuratedTheme[] = [NimiThemeType.NIMI];

  if (!userPOAPList) return themes;

  for (const theme of themeToPoapMapping) {
    const hasTheme = userPOAPList.some((poap) => theme.eventId.includes(poap.event.id));
    if (hasTheme) {
      themes.push(theme.theme);
    }
  }

  return themes;
}

const debug = createDebugger('hooks:useAvaliableThemesFromPoaps');

/**
 * Returns array of themes user has avaliable
 */
export function useAvaliableThemesFromPoaps(account?: string): UseAvaliableTheme {
  const { data, isLoading, isFetching } = usePoapsFromUser(account);

  debug({ poapData: data });

  return {
    isLoading: isLoading || isFetching,
    avaliableThemes: getAvailableThemesByPOAPs(data),
    hasPoaps: data ? data.length !== 0 : false,
  };
}
