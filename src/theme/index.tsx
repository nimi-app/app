import React from 'react';
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme,
} from 'styled-components';

import { Text, TextProps } from 'rebass';
import { Colors } from './styled';

export * from './components';

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
  background-color: #EDF2F7!important;
  overflow-x: hidden;
}

html, body, input, label, textarea, button {
  font-family: 'Archivo', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Archivo', sans-serif;
}

.background-img {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  z-index: -1;
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

.nimi-curated {
  margin: 142px 0;
  padding: 0 30px;
}

h2, h3 {
  background: linear-gradient(45deg, #4368EA, #C490DD);
  background: -webkit-linear-gradient(45deg, #4368EA, #C490DD);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

// Email form

.email-form {
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0 30px;
}

.email-form h3 {
  font-weight: 600;
  font-size: 42px;
  margin-right: 32px;
}

.email-field-container {
  display: flex;
  justify-content: center;
  max-width: 100%;
}

.email-field {
  height: 70px;
  min-width: 335px;
  font-weight: 363;
  font-size: 20px;
  border: none;
  outline: none;
  border-radius: 40px;
  padding: 20px 65px 20px 26px;
}

.email-form button {
  width: 160px;
  min-width: 135px;
  margin-left: -65px;
}

.cards-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-items: stretch;
  flex-wrap: wrap;
  margin: 142px 110px;
  max-width: 1800px;
}

.card {
  position: relative;
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  width: calc(25% - 24px);
  min-width: 350px;
  margin: 0 15px 15px 0;
  padding: 0 42px 42px 42px;
  background-color: #fff;
  border-radius: 62px;
}

.card-img-container {
  height: 320px;
  width: calc(100% + 82px);
  margin-left: -41px;
  margin-bottom: 25px;
}

.card svg,
.card img {
  margin: 0;
  max-height: 100%;
  max-width: 100%;
  width: unset;
}


.card h3 {
  color: #7076E6;
  margin-bottom: 10px;
  font-size: 26px;
  font-variation-settings: "wdth" 95;
  text-align: left;
}

.card p {
  color: #9D9DBF;
  font-size: 20px;
  text-align: left;
}

// Links section

.links-section {
  max-width: 1000px;
  margin: 0 auto;
}

.links-categories {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 82px;
}

.link-category-label {
  margin: 0 41px;
  font-weight: 400;
  font-size: 24px;
  color: #9D9DBF;
}

.link-category-label.active {
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, rgba(192,229,240,1) 0%, rgba(129,131,225,1) 100%);
  padding: 0 24px;
  height: 70px;
  border-radius: 70px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 24px;
  color: #fff;
}

.links-section h2 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 8px;
}

.links-section p {
  color: #9D9DBF;
  font-size: 28px;
}

.links-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 72px 25px 0 25px;
}

.link-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  margin: 8px;
}

.link-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  padding: 12px 16px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 5px 18px rgba(156, 149, 233, 0.2);
}

.link-card span {
  color: #09244B;
  margin-left: 8px;
}

// Made possible

.made-possible-section {
  margin-top: 172px;
}

.made-possible-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.made-possible-section h2 {
  font-weight: 600;
  font-size: 32px;
  z-index: 1;
}

.made-possible-section img {
  position: absolute;
  width: 160px;
}

.made-possible-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 105px 0 120px 0;
}

.made-possible-logos svg {
  position: relative;
  margin: 0 35px 0 35px;
}

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px 0 80px 0;
}

footer span {
  margin: 32px 0;
  font-weight: 600;
  font-size: 13px;
  color: #B7B7F3;
}

.social-icons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.social-icons svg {
  margin: 0 30px;
}

// todo remove
iframe {
  display: none;
}

// Mobile

@media only screen and (max-width: 1200px) {
  .email-form h3 {
    font-size: 35px;
  }
}

@media only screen and (max-width: 950px) {

  body,
  html,
  #root {
    width:100vw;
  }

  .landing-container {
    margin: 0 auto;
    width: 90vw;
    align-items: center;
  }

  .nimi-curated {
    margin: 0;
    padding: 0;
    max-width: 90vw;
  }

  .email-form {
    flex-direction: column;
    max-width: 100%;
    padding: 0;
  }

  .email-form h3 {
    margin: 0 0 50px 0;
  }

  .email-field {
    max-width: 100%;
    font-size: 17px;
  }

  .cards-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 142px 0;
  }

  .card {
    width: 100%;
    margin: 0 0 25px 0;
  }

  .card-img-container img {
    width: unset;
  }

  .links-section {
    width:100vw;
    max-width: 100%;
  }
  
  .links-categories {
    width: 100%;
    flex-wrap: wrap;
  }
  
  .link-category-label {
    margin: 0 25px 25px 25px;
  }

  .links-container {
    margin: 72px 0 0 0;
  }

  .made-possible-section {
    width: 100%;
  }

  .made-possible-logos {
    flex-wrap: wrap;
    margin: 105px 0 60px 0;
  }

  .made-possible-logos svg {
    margin: 0 35px 35px 35px;
  }
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
