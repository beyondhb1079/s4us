import React, { useState } from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import LoginDialog from './LoginDialog';
import { Redirect } from 'react-router-dom';

export default function LoginButton() {
  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // initialized to false
  const handleClose = () => setLoginDialogOpen(false);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsSignedIn(true);
      setLoginDialogOpen(false);
    } else {
      setIsSignedIn(false);
    }
  });

  function newUser() {
    if (isSignedIn === true) {
      return <Redirect to="/newuser" />
    }
  }

  const signUserOut = () => firebase.auth().signOut();
  const showLoginDialog = () => setLoginDialogOpen(true);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={isSignedIn ? signUserOut : showLoginDialog}>
        {isSignedIn ? 'Sign out' : 'Login'}
      </Button>
      {newUser()}
      <LoginDialog open={loginDialogOpen} onClose={handleClose} />
    </div>
  );
}
