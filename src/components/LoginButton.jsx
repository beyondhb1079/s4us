import React from 'react';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import LoginDialog from './LoginDialog';

export default function LoginButton() {
  const [isSignedIn, setLoggedIn] = React.useState(null);
  const [loginDialogOpen, setDialogOpen] = React.useState(false);

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
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => { isSignedIn ? signUserOut() : showLoginDialog(); }}
      >
        {isSignedIn ? 'Sign out' : 'Login'}
      </Button>
      <LoginDialog open={loginDialogOpen} />
    </div>
  );
}
