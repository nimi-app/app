import { NimiThemeType } from "@nimi.io/card";

export type ThemesCurated = Exclude<NimiThemeType, NimiThemeType.INFINITE>;
export interface ThemeAssets {

    type: NimiThemeType;
    logoImage: string;
    logoText: string;
    preview: string;
  
};