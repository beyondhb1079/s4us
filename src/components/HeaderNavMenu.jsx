import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { makeStyles, Link as MuiLink, Grid, Zoom } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ProfileMenu from './ProfileDropdown';

const useStyles = makeStyles((theme) => ({
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    color: theme.palette.text.secondary,
  },
  authItem: {
    minWidth: '100px',
  },
}));

function HeaderNavMenu() {
  const classes = useStyles();
  const links = {
    Scholarships: '/scholarships',
    Add: '/scholarships/new',
    About: '/about',
    Contact: '/contact',
  };

  const [isSignedIn, setIsSignedIn] = useState(
    !!firebase.auth().currentUser || undefined
  );
  const loading = isSignedIn === undefined;

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user)),
    []
  );

  return (
    <Grid container spacing={3} className={classes.menu}>
      {Object.entries(links).map(([title, link]) => (
        <Grid item key={title}>
          <MuiLink component={Link} to={link} className={classes.menuItem}>
            {title}
          </MuiLink>
        </Grid>
      ))}
      <Grid item className={classes.authItem}>
        {!loading && (
          <Zoom in>
            {isSignedIn ? (
              <ProfileMenu />
            ) : (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={{ state: { showLoginDialog: true } }}
                replace>
                Login
              </Button>
            )}
          </Zoom>
        )}
      </Grid>
    </Grid>
  );
}

export default HeaderNavMenu;
