import { createTheme } from '@mui/material';

const theme = createTheme({
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
  },
  typography: {
    body1: {
      color: 'rgb(100, 100, 100)',
    },
  },
});
export default theme;
