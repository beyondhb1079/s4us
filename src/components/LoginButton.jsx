import React, { useState } from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import LoginDialog from './LoginDialog';

export default function LoginButton() {
  var user = firebase.auth().currentUser; // determines how to initialize isSignedIn
  const [isSignedIn, setLoggedIn] = useState(!!user);
  const [loginDialogOpen, setDialogOpen] = useState(false); // initialized to false

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
      setDialogOpen(false);
    } else {
      setLoggedIn(false);
    }
  });

  function signUserOut() {
    firebase.auth().signOut();
  }

  function showLoginDialog() {
    setDialogOpen(true);
  }

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={() => {
        isSignedIn ? signUserOut() : showLoginDialog();
      }}>
        {isSignedIn ? 'Sign out' : 'Login'}
      </Button>
      <LoginDialog open={loginDialogOpen} />
    </div>
  );
}
