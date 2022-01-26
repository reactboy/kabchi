import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import '@fontsource/lato'

const styles = {
  global: (_props) => ({
    'html, body': {
      bg: 'kbBgLight',
      color: 'kbviolet.900',
    },
    '*, *::before, *::after': {
      color: 'inherit',
    },
  }),
}

const breakpoints = createBreakpoints({
  sm: '400px',
  md: '700px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1600px',
})
const colors = {
  kbpurple: {
    50: '#E7E7ED',
    100: '#D6D7E3',
    200: '#C5C6D9',
    300: '#B5B6CF',
    400: '#A4A5C4',
    500: '#8284AE',
    600: '#9293B8',
    700: '#7274A5',
    800: '#61639A',
    900: '#525491',
  },
  kbviolet: {
    50: '#E2DFE4',
    100: '#CDC8D1',
    200: '#B8B0BE',
    300: '#A398AB',
    400: '#8E8098',
    500: '#7A6986',
    600: '#655173',
    700: '#513A61',
    800: '#3C224E',
    900: '#270B3B',
  },
  kbbrown: {
    50: '#E4DFE0',
    100: '#D0C6C8',
    200: '#BEAFB1',
    300: '#AC989B',
    400: '#977E82',
    500: '#85676B',
    600: '#714E54',
    700: '#5F373D',
    800: '#4C1F26',
    900: '#39070F',
  },
  kbgray: {
    50: '#F1F1F2',
    100: '#EBEAEC',
    200: '#E5E3E6',
    300: '#E0DDE1',
    400: '#D8D5DA',
    500: '#D1CDD4',
    600: '#CCC7CE',
    700: '#C5C1C9',
    800: '#C0BAC3',
    900: '#BAB4BE',
  },
  kbbeige: {
    50: '#EAE8E8',
    100: '#DED9D9',
    200: '#D1CACB',
    300: '#C5BBBC',
    400: '#B7ABAC',
    500: '#AB9C9E',
    600: '#9E8D8F',
    700: '#917E80',
    800: '#857071',
    900: '#796163',
  },
  kbBgLight: '#F7F7F7',
  kbwhite: '#FFFFFF',
}

const fonts = {
  body: "'Lato', sans-serif",
  heading: "'Lato', sans-serif",
}

export const theme = extendTheme({ breakpoints, styles, colors, fonts })
