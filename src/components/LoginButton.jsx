import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import LoginDialog from './LoginDialog';
import ProfileMenu from './ProfileDropdown';

export default function LoginButton() {
  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // initialized to false
  const handleClose = () => setLoginDialogOpen(false);

  const { currentUser } = firebase.auth();
  let userName;
  let userEmail;
  let photoUrl;

  if (currentUser != null) {
    userName = currentUser.displayName;
    userEmail = currentUser.email;
    photoUrl = currentUser.photoURL;
  }

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
        if (user) {
          setLoginDialogOpen(false);
        }
      });
    return unregisterAuthObserver;
  }, []); // [] skips cleanup of this effect until the component is unmounted

  const signUserOut = () => firebase.auth().signOut();
  const showLoginDialog = () => setLoginDialogOpen(true);

  function ProfileDropdown(loginStatus) {
    if (loginStatus === true) {
      return (
        <ProfileMenu
          signOut={signUserOut}
          name={userName}
          email={userEmail}
          photo={photoUrl}
        />
      );
    }
    return (
      <>
        <LoginDialog open={loginDialogOpen} onClose={handleClose} />
        <Button variant="contained" color="primary" onClick={showLoginDialog}>
          Login
        </Button>
      </>
    );
  }

  return <>{ProfileDropdown(isSignedIn)}</>;
}
