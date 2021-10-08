import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Link as MuiLink,
  Snackbar,
  Zoom,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ProfileMenu from './ProfileDropdown';

import { BRAND_NAME, SUBSCRIPTION_FORM_URL } from '../config/constants';
import HeaderNavMenu from './HeaderNavMenu';

const OnRenderSnackbar = () => {
  const match = window.location.hostname.match(/s4us-pr-(\d+)\.onrender\.com/);
  const [open, setOpen] = useState(true);
  if (!match) return null;

  const num = match[1];
  const link = `https://github.com/beyondhb1079/s4us/pull/${num}`;
  return (
    <Snackbar open={open}>
      <Alert onClose={() => setOpen(false)} severity="info">
        This is a preview of <MuiLink href={link}>Pull Request #{num}</MuiLink>
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

const AuthZoomButton = () => {
  const { currentUser } = firebase.auth();
  const [isSignedIn, setIsSignedIn] = useState(
    !!firebase.auth().currentUser || undefined
  );

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user)),
    []
  );

  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <Zoom in={isSignedIn !== undefined}>
        {isSignedIn ? (
          <IconButton
            size="medium"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            color="inherit">
            <Avatar src={currentUser.photoURL} />
          </IconButton>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to={{ state: { showLoginDialog: true } }}>
            Login
          </Button>
        )}
      </Zoom>
      {isSignedIn && (
        <ProfileMenu
          anchorEl={anchorEl}
          handleClose={() => setAnchorEl(null)}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-around',
    },
  },
  authItem: {
    minWidth: '100px',
  },
}));

const links = {
  Scholarships: '/scholarships',
  Add: '/scholarships/new',
  About: '/about',
  Contact: '/contact',
};

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
          <HeaderNavMenu links={links} />
        </Grid>

        <Grid item className={classes.authItem}>
          <AuthZoomButton />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Header;
