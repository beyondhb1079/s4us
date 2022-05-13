import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material';

const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiTab: {
        styleOverrides: {
          textColorPrimary: {
            ':not(&.Mui-selected)': {
              color: 'rgb(0,0,0, 0.6)',
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          variant: 'outlined',
        },
      },
    },
    palette: {
      background: {
        default: '#F8F9FA',
        secondary: '#242424',
      },
      primary: {
        main: '#21409A',
      },
      secondary: {
        main: '#ffffff',
      },
      text: {
        secondary: '#9e9e9e',
      },
    },
    typography: {
      body1: {
        color: 'rgb(100, 100, 100)',
      },
    },
  } as ThemeOptions)
);

export default theme;
