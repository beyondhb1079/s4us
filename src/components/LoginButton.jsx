import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import ProfileMenu from './ProfileDropdown';

export default function LoginButton() {
  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);
  const location = useLocation();

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return unregisterAuthObserver;
  }, []);

  const signUserOut = () => firebase.auth().signOut(); // sign out + closes dialog
  const user = firebase.auth().currentUser;

  return isSignedIn ? (
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
  );
}
