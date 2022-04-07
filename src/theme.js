import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  components: {
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
});
theme = responsiveFontSizes(theme);

export default theme;
