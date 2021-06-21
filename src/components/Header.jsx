import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  makeStyles,
  Link as MuiLink,
  Grid,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { BRAND_NAME } from '../config/constants';
import HeaderNavMenu from './HeaderNavMenu';

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-around',
    },
  },
  banner: {
    backgroundColor: 'black',
    color: 'white',
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
  return (
    <Container>
      <Alert className={classes.banner} severity="info">
        Website Actively Under-Construction!
      </Alert>
      {alert}
      <Grid container className={classes.header} spacing={3}>
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
