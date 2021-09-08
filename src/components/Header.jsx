import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  makeStyles,
  Link as MuiLink,
  Grid,
  Snackbar,
  Button,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { BRAND_NAME, SUBSCRIPTION_FORM_URL } from '../config/constants';
import HeaderNavMenu from './HeaderNavMenu';

const OnRenderSnackbar = () => {
  const match = window.location.hostname.match(/s4us-pr-(\d+)\.onrender\.com/);
  const [open, setOpen] = useState(true);
  if (!match) return null;

  const link = `https://github.com/beyondhb1079/s4us/pull/${match[1]}`;
  return (
    <Snackbar open={open}>
      <Alert onClose={() => setOpen(false)} severity="info">
        This is a preview of <a href={link}>Pull Request #{match[1]}</a>
      </Alert>
    </Snackbar>
  );
};

const UnderConstructionAlert = () => (
  <Alert
    severity="warning"
    action={
      <Button component={MuiLink} href={SUBSCRIPTION_FORM_URL}>
        SUBSCRIBE FOR UPDATES
      </Button>
    }>
    <AlertTitle>Warning</AlertTitle>
    🚧 Website Actively Under-Construction! 🚧
  </Alert>
);

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
}));

function Header() {
  const classes = useStyles();
  return (
    <Container>
      <UnderConstructionAlert />
      <OnRenderSnackbar />
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
