import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';

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

  const signUserOut = () => firebase.auth().signOut();

  if (isSignedIn)
    return (
      <Button variant="contained" color="primary" onClick={signUserOut}>
        Sign out
      </Button>
    );

  return (
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to={{
        pathname: `${location.pathname}`,
        search: '?login=true',
        state: { from: location.pathname },
      }}>
      Login
    </Button>
  );
}
