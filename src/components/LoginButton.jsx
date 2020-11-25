import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import LoginDialog from './LoginDialog';
import ProfileMenu from './ProfileDropdown';

export default function LoginButton() {
  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // initialized to false
  const handleClose = () => setLoginDialogOpen(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
        if (user) {
          setLoginDialogOpen(false);
          setName(user.displayName);
          setEmail(user.email);
          setPhotoURL(user.photoURL);
        }
      });
    return unregisterAuthObserver;
  }, []); // [] skips cleanup of this effect until the component is unmounted

  const signUserOut = () => firebase.auth().signOut();
  const showLoginDialog = () => setLoginDialogOpen(true);

  return (
    <>
      {isSignedIn ? (
        <ProfileMenu
          signOut={signUserOut}
          name={name}
          email={email}
          photo={photoURL}
        />
      ) : (
        <>
          <LoginDialog open={loginDialogOpen} onClose={handleClose} />
          <Button variant="contained" color="primary" onClick={showLoginDialog}>
            Login
          </Button>
        </>
      )}
    </>
  );
}
