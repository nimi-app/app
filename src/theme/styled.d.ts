import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components';

export type Color = string;
export interface Colors {
  // base
  white: Color;
  black: Color;

  // text
  text1: Color;
  text2: Color;
  text3: Color;
  text4: Color;
  text5: Color;
  text6: Color;
  // backgrounds / greys
  bg1: Color;
  bg1And2: Color;
  bg2: Color;
  bg3: Color;
  bg4: Color;
  bg5: Color;
  bg6: Color;
  bg7: Color;
  bg8: Color;

  modalBG: Color;
  advancedBG: Color;
  mainBackgoround: Color;

  //blues
  primary1: Color;
  primary2: Color;
  primary3: Color;
  primary4: Color;
  primary5: Color;

  primaryText1: Color;

  // pinks
  secondary1: Color;
  secondary2: Color;
  secondary3: Color;

  // other
  red1: Color;
  red2: Color;
  orange1: Color;
  green1: Color;
  green2: Color;
  yellow1: Color;
  yellow2: Color;
  blue1: Color;
  gray1: Color;
  // new UI refactor colors, taken from ZeroHeight
  mainPurple: Color;
  purpleBase: Color;
  purpleOverlay: Color;
  purple2: Color;
  purple3: Color;
  purple4: Color;
  purple5: Color;
  boxShadow: Color;
  shadow1: Color;

  // darkest // dark1.1
  darkest: Color;
  dark1: Color;
  dark2: Color;
}

export interface Grids {
  sm: number;
  md: number;
  lg: number;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    grids: Grids;

    // shadows
    shadow1: string;

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>;
      upToSmall: ThemedCssFunction<DefaultTheme>;
      upToMedium: ThemedCssFunction<DefaultTheme>;
      upToLarge: ThemedCssFunction<DefaultTheme>;
    };

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation;
    flexRowNoWrap: FlattenSimpleInterpolation;
  }
}
