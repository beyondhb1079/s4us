import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {
  AppBar,
  Avatar,
  Button,
  Hidden,
  IconButton,
  Link as MuiLink,
  makeStyles,
  Snackbar,
  Toolbar,
  Zoom,
} from '@material-ui/core';
import ProfileMenu from './ProfileDropdown';
import { Alert, AlertTitle } from '@material-ui/lab';
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const showProfileMenu = (event) => setAnchorEl(event.currentTarget);
  const closeProfileMenu = () => setAnchorEl(null);
  return (
    <Zoom in={isSignedIn !== undefined}>
      {isSignedIn ? (
        <>
          <IconButton
            size="medium"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={showProfileMenu}
            color="inherit">
            <Avatar src={currentUser.photoURL} />
          </IconButton>
          <ProfileMenu anchorEl={anchorEl} handleClose={closeProfileMenu} />
        </>
      ) : (
        <Button
          color="inherit"
          component={Link}
          to={{ state: { showLoginDialog: true } }}>
          Login
        </Button>
      )}
    </Zoom>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  authZoom: {
    flexGrow: 1,
    justifyContent: 'right',
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
    <AppBar position="static">
      <UnderConstructionAlert />
      <OnRenderSnackbar />
      <Toolbar>
        <MuiLink
          component={Link}
          to="/"
          variant="h4"
          color="inherit"
          underline="none"
          className={classes.title}>
          {BRAND_NAME.toUpperCase()}
        </MuiLink>
        <Hidden xsDown>
          <HeaderNavMenu links={links} />
        </Hidden>
        <AuthZoomButton className={classes.authItem} />
      </Toolbar>
      <Hidden smUp>
        <Toolbar variant="dense">
          <HeaderNavMenu links={links} />
        </Toolbar>
      </Hidden>
    </AppBar>
  );
}

export default Header;
