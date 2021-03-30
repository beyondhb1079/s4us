import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  makeStyles,
  Link as MuiLink,
  Grid,
  Snackbar,
  useMediaQuery,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { BRAND_NAME } from '../config/constants';
import HeaderNavMenu from './HeaderNavMenu';

const useStyles = makeStyles((theme) => ({
  header: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-around',
    },
  },
}));

function Header() {
  const match = window.location.hostname.match(/s4us-pr-(\d+)\.onrender\.com/);
  let alert = '';
  const [open, setOpen] = React.useState(match !== null);
  if (match !== null) {
    const link = `https://github.com/beyondhb1079/s4us/pull/${match[1]}`;
    alert = (
      <Snackbar open={open}>
        <Alert onClose={() => setOpen(false)} severity="info">
          This is a preview of <a href={link}>Pull Request #{match[1]}</a>
        </Alert>
      </Snackbar>
    );
  }

  const classes = useStyles();
  const smallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Container>
      {alert}
      <Grid container className={classes.header} spacing={smallScreen ? 2 : 3}>
        <Grid item>
          <MuiLink component={Link} to="/" variant="h4" underline="none">
            {BRAND_NAME.toUpperCase()}
          </MuiLink>
        </Grid>
        <Grid item>
          <HeaderNavMenu />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Header;
