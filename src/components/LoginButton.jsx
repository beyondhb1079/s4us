import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import LoginDialog from './LoginDialog';
import ProfileMenu from './ProfileDropdown';

export default function LoginButton() {
  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // initialized to false
  const handleClose = () => setLoginDialogOpen(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return unregisterAuthObserver;
  }, []); // [] skips cleanup of this effect until the component is unmounted

  const signUserOut = () => firebase.auth().signOut() && handleClose(); // sign out + closes dialog
  const showLoginDialog = () => setLoginDialogOpen(true);
  const user = firebase.auth().currentUser;

  return isSignedIn ? (
    <ProfileMenu
      signOut={signUserOut}
      name={user.displayName}
      email={user.email}
      photo={user.photoURL}
    />
  ) : (
    <>
      <LoginDialog open={loginDialogOpen} onClose={handleClose} />
      <Button variant="contained" color="primary" onClick={showLoginDialog}>
        Login
      </Button>
    </>
  );
}
