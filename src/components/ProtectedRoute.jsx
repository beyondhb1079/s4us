import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';
import LoginDialog from './LoginDialog';

function ProtectedRoute({ component: Component, ...rest }) {
  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);
  const [loginDialogOpen, setLoginDialogOpen] = useState(true); // initialized to false
  const handleClose = () => setLoginDialogOpen(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return unregisterAuthObserver;
  }, []);

  return (
    <Route
      {...rest}
      render={() => {
        return isSignedIn ? (
          <Component />
        ) : (
          <LoginDialog open={loginDialogOpen} onClose={handleClose} />
        );
      }}
    />
  );
}
export default ProtectedRoute;
