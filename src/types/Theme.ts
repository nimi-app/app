import { NimiThemeType } from "@nimi.io/card/types";

export type NimiCuratedTheme = Exclude<NimiThemeType, NimiThemeType.INFINITE>;
export interface ThemeAssets {
    type: NimiThemeType;
    logoImage: string;
    logoText: string;
    preview: string;

};