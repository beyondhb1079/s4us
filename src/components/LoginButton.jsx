import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import ProfileMenu from './ProfileDropdown';

export default function LoginButton() {
  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);
  const [loading, setLoading] = useState(true);
  const [error] = useState();

  function updateUserStatus(user) {
    setLoading(false);
    setIsSignedIn(!!user);
  }

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => updateUserStatus(user)),
    []
  );

  const signUserOut = () => firebase.auth().signOut();
  const user = firebase.auth().currentUser;

  return (
    <>
      {error?.toString() ||
        (loading && <null />) ||
        (isSignedIn ? (
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
        ))}
    </>
  );
}
