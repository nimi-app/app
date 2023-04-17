import { NimiThemeType, POAPToken } from '@nimi.io/card/types';

import { useUserPOAPs } from '../api/RestAPI/hooks/useUserPOAPs';
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
  {
    theme: NimiThemeType.ETHTLV_2023,
    eventId: [
      63182, 98806, 98810, 98812, 98813, 99047, 98815, 98818, 99044, 99608, 99923, 98823, 98826, 99610, 98827, 99348,
      99614, 99850, 97863, 98828, 98829, 98830, 98831, 98835, 99616, 98837, 98838, 98839, 99851,
    ],
  },
];

/**
 * Returns array of themes user has available available Themes
 * @param userPOAPList
 * @returns
 */
export function getAvailableThemesByPOAPs(userPOAPList?: POAPToken[]) {
  const themes: NimiCuratedTheme[] = [NimiThemeType.DAO_TOKYO_2023];

  if (!userPOAPList) return themes;

  for (const theme of themeToPoapMapping) {
    const hasTheme = userPOAPList.some((poap) => theme.eventId.includes(poap.event.id));
    if (hasTheme) {
      themes.push(theme.theme);
    }
  }

  return themes;
}

/**
 * Returns array of themes user has avaliable
 */
export function useAvaliableThemesFromPoaps(account?: string): UseAvaliableTheme {
  const { data, isLoading, isFetching } = useUserPOAPs(account);

  return {
    isLoading: isLoading || isFetching,
    avaliableThemes: getAvailableThemesByPOAPs(data),
    hasPoaps: data ? data.length !== 0 : false,
  };
}
