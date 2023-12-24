
  export type Colors = keyof typeof Tokens.colors
  export type FontSize = keyof typeof Tokens.fontSizes
  export type Shadows = keyof typeof Tokens.boxShadows

  export type Token = Colors | FontSize | Shadows

  export const Tokens = {
  colors: {
    primary: {
      '50': '#2129fb',
      '100': '#040df4',
      '200': '#040bd1',
      '300': '#0309ae',
      '400': '#030892',
      '500': '#02066f',
      '600': '#01044c',
      '700': '#00010d',
      '800': '#000000',
      '900': '#000000',
      base: '#5a5c8c',
      darkmode: '#9195fd',
    },
    background: {
      base: '#fbfefb',
      darkmode: '#010401',
    },
    accent: {
      '50': '#fae3fa',
      '100': '#f5c5f4',
      '200': '#f0a6ef',
      '300': '#ea88e9',
      '400': '#e66fe5',
      '500': '#e151df',
      '600': '#dc33d9',
      '700': '#b01eae',
      '800': '#911990',
      '900': '#731471',
      base: '#e151df',
      darkmode: '#FF0DBE',
    },
    secondary: {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ece8fb',
      '300': '#d3caf6',
      '400': '#bfb1f1',
      '500': '#a693ec',
      '600': '#8d75e7',
      '700': '#603edd',
      '800': '#4a25d2',
      '900': '#3f20b4',
      base: '#a693ec',
      darkmode: '#d3caf6',
    },
    text: {
      '50': '#28b31d',
      '100': '#219418',
      '200': '#1a7513',
      '300': '#13560e',
      '400': '#0e3e0a',
      '500': '#071f05',
      '600': '#000000',
      '700': '#000000',
      '800': '#000000',
      '900': '#000000',
      base: '#071f05',
      darkmode: '#e9fbe8',
    },
    smalltext: {
      '50': '#dfdfdf',
      '100': '#cdcdcd',
      '200': '#bbbbbb',
      '300': '#a9a9a9',
      '400': '#9b9b9b',
      '500': '#898989',
      '600': '#777777',
      '700': '#575757',
      '800': '#454545',
      '900': '#333333',
      base: '#718096',
    },
  },
  fontSizes: {
    sm: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
  },
  fontWeights: {
    light: '200',
    normal: '400',
    bold: '700',
  },
  lineHeights: {
    short: '1',
    normal: '1.5',
    tall: '2',
  },
  boxShadows: {
    sm: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
  },
}
  