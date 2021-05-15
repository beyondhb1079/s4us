import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
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
