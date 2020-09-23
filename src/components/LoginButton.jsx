import React, { useState } from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import LoginDialog from './LoginDialog';

export default function LoginButton() {
  const { currentUser } = firebase.auth(); // determines how to initialize isSignedIn
  const [isSignedIn, setLoggedIn] = useState(!!currentUser);
  const [loginDialogOpen, setDialogOpen] = useState(false); // initialized to false

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
      setDialogOpen(false);
    } else {
      setLoggedIn(false);
    }
  });

  const signUserOut = () => firebase.auth().signOut();
  const showLoginDialog = () => setDialogOpen(true);

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={isSignedIn ? signUserOut : showLoginDialog}
      >
        {isSignedIn ? 'Sign out' : 'Login'}
      </Button>
      <LoginDialog open={loginDialogOpen} onClose={false} />
    </div>
  );
}
