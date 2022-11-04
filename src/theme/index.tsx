import React from 'react';
import { Text, TextProps } from 'rebass';
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';

import { Colors } from './styled';

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 1000,
  upToLarge: 1280,
};

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as any;

const white = '#FFFFFF';
const black = '#000000';

export function colors(darkMode = false): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#14131D',
    text2: darkMode ? '#EBE9F8' : '#464366',
    text3: darkMode ? '#DDDAF8' : '#8E89C6',
    text4: darkMode ? '#C0BAF6' : '#A7A0E4',
    text5: darkMode ? '#8780BF' : '#C0BAF6',
    text6: '#504D72',

    // backgrounds / greys
    bg1: darkMode ? '#191A24' : '#FFFFFF',
    bg1And2: darkMode ? '#1D202F' : '#FFFFFF',
    bg2: darkMode ? '#2A2F42' : '#EBE9F8',
    bg3: darkMode ? '#3E4259' : '#DDDAF8',
    bg4: darkMode ? '#686E94' : '#C0BBE9',
    bg5: darkMode ? '#9096BE' : '#7873A4',
    bg6: '#171621',
    bg7: '#2D3040',
    bg8: '#191A24',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#2E17F2' : '#551a8b',
    primary2: darkMode ? '#3680E7' : '#F9F5FF',
    primary3: darkMode ? '#4D8FEA' : '#D4C2FC',
    primary4: darkMode ? '#376bad70' : '#998FC7',
    primary5: darkMode ? '#153d6f70' : '#D6D3D9',

    // color text
    primaryText1: darkMode ? '#6da8ff' : '#551a8b',

    // secondary colors
    secondary1: darkMode ? '#2172E5' : '#551a8b',
    secondary2: darkMode ? '#17000b26' : '#998FC7',
    secondary3: darkMode ? '#17000b26' : '#D4C2FC',

    // other
    red1: '#F02E51',
    red2: '#F82D3A',
    orange1: '#f2994a',
    green1: '#27AE60',
    green2: '#0E9F6E',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#2172E5',
    gray1: '#737798',
    mainBackgoround: '#f5f7ff',
    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',

    // new UI refactor colors
    mainPurple: '#2E17F2',
    purpleBase: '#101016',
    purpleOverlay: '#111018',
    purple2: '#C0BAF6',
    purple3: '#8780BF',
    purple4: '#685EC6',
    purple5: '#464366',
    boxShadow: '#0A0A0F',
    shadow1: '#2F80ED',

    // darkest // dark 1.1
    darkest: '#161721',
    dark1: '#191824',
    dark2: '#2A2F42',
  };
}

export function theme(): DefaultTheme {
  return {
    ...colors(),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <StyledComponentsThemeProvider theme={theme()}>{children}</StyledComponentsThemeProvider>;
}

export const NimiSignatureColor = css`
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
export const NimiModalStyles = css`
  background: #f0f3fb;
  border-radius: 12px;
  padding: 16px;
`;
export const SharedInputStyles = css<{ inputInvalid?: boolean }>`
  width: 100%;
  line-height: 22px;
  font-size: 16px;
  font-weight: 400;
  color: #8c90a0;
  border-radius: 20px;
  border: none;
  outline: none;
  transition: all 0.1s linear;

  &:focus {
    background-color: white;
    font-size: 18px;
    font-weight: 500;
    box-shadow: 0px 5px 14px rgba(188, 180, 180, 0.2);

    & + .clear-button {
      visibility: visible;
      opacity: 1;
    }

    color: #5274ff;
    border: double 2px transparent;
    background-image: linear-gradient(white, white), linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }

  ${({ inputInvalid }) =>
    inputInvalid &&
    `
      border: 2px solid #EB5757;
      color: #EB5757;
    `}
`;

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`;

export const TYPE = {
  Main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />;
  },
  Link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />;
  },
  Black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />;
  },
  White(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />;
  },
  Body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text5'} {...props} />;
  },
  LargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />;
  },
  MediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />;
  },
  SubHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />;
  },
  Small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />;
  },
  Blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />;
  },
  Yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />;
  },
  DarkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />;
  },
  Gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />;
  },
  Italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />;
  },
  Error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />;
  },
};
export const FixedGlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

html, body, input, label, textarea, button {
  font-family: 'Archivo', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Archivo', sans-serif;
}



/** Full-width and height */
body, html, #root {
  min-height:100vh;
  width: 100%;
}



button {
  user-select: none;
}

a {
  text-decoration: none;
}

pre, code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
}
`;

export const ThemedGlobalStyle = createGlobalStyle`

html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg1};
  color-scheme: 'light';
}

body {
  position: relative;
  min-height: 100vh;
  background-repeat: no-repeat;
  margin: 0 !important;
}

.modal-root {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
`;
