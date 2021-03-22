import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
export const GlobalColors = {
  backgroundDefault: '#FFF',
  backgroundActive: '#F6F8F9',
  primary: '#2196F3',
  secondary: '#FFF',
  textPrimary: '#1C1C1C',
  textSecondary: '#8B8B8B',
  primaryContrastText: '#FFF',
  border: '#F2F2F2',
  hoverBackground: 'rgb(255,193,7,0.12)',
  imageBackground: '#F2F2F2',
  inputBackground: '#F2F4F5',
}

const GlobalTheme = createMuiTheme({
  palette: {
    primary: {
      main: GlobalColors.primary,
    },
    secondary: {
      main: GlobalColors.secondary,
    },
    background: {
      default: GlobalColors.backgroundDefault,
    },
    text: {
      primary: GlobalColors.textPrimary,
      secondary: GlobalColors.textSecondary,
    },
    action: {
      hover: GlobalColors.hoverBackground,
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontWeightLight: 500,
    fontWeightRegular: 600,
    fontWeightBold: 700,
    fontWeightMedium: 900,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1100,
      lg: 1350,
      xl: 1920,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        '&:hover, &:active': {
          backgroundColor: GlobalColors.hoverBackground,
        },
      },
      containedSecondary: {
        color: GlobalColors.primaryContrastText,
        borderRadius: 10,
      },
      containedPrimary: {
        color: GlobalColors.primaryContrastText,
        borderRadius: 10,
        border: `1px solid ${GlobalColors.primary}`,
        boxShadow: 'none',
        '&:hover, &:active': {
          backgroundColor: GlobalColors.primaryContrastText,
          color: GlobalColors.primary,
          boxShadow: 'none',
        },
      },
    },
  },
  props: {
    MuiPaper: {
      elevation: 0,
    },
    MuiGrid: {
      xs: 12,
    },
  },
})

export default GlobalTheme
