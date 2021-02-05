import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { makeStyles, Link as MuiLink, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ProfileMenu from './ProfileDropdown';

const useStyles = makeStyles((theme) => ({
  menu: {
    alignItems: 'right',
    justifyContent: 'center',
  },
  menuItem: {
    color: theme.palette.text.secondary,
  },
  avatarMenu: {
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

  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);
  const [loading, setLoading] = useState(true);

  function updateUserStatus(user) {
    setLoading(false);
    setIsSignedIn(!!user);
  }

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => updateUserStatus(user)),
    []
  );

  const signUserOut = () => firebase.auth().signOut();
  const user = firebase.auth().currentUser;

  return (
    <Grid container spacing={3} className={classes.menu}>
      {Object.entries(links).map(([title, link]) => (
        <Grid item key={title}>
          <MuiLink component={Link} to={link} className={classes.menuItem}>
            {title}
          </MuiLink>
        </Grid>
      ))}
      <Grid item className={classes.avatarMenu}>
        {(loading && <null />) ||
          (isSignedIn ? (
            <ProfileMenu
              signOut={signUserOut}
              name={user.displayName}
              email={user.email}
              photo={user.photoURL}
            />
          ) : (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={{
                state: { showLoginDialog: true },
              }}
              replace>
              Login
            </Button>
          ))}
      </Grid>
    </Grid>
  );
}

export default HeaderNavMenu;
