import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    background: {
      default: '#F3F6FA',
      secondary: '#242424',
    },
    primary: {
      main: '#3C64B1',
    },
  },
  typography: {
    body1: {
      color: 'rgb(100, 100, 100)',
    },
  },
});
export default theme;
