import { NimiThemeType } from "@nimi.io/card";

export type NimiCuratedTheme = Exclude<NimiThemeType, NimiThemeType.INFINITE_2023_BOGOTA>;
export interface ThemeAssets {
    type: NimiThemeType;
    logoImage: string;
    logoText: string;
    preview: string;
  
};