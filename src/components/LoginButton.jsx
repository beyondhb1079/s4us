import React, { useState } from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import LoginDialog from './LoginDialog';

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

  const signUserOut = () => firebase.auth().signOut();
  const showLoginDialog = () => setLoginDialogOpen(true);

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={isSignedIn ? signUserOut : showLoginDialog}>
        {isSignedIn ? 'Sign out' : 'Login'}
      </Button>
      <LoginDialog open={loginDialogOpen} onClose={handleClose} />
    </div>
  );
}
