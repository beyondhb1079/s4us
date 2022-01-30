import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import firebase from 'firebase';
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default function LoginDialog() {
  const location = useLocation();
  const showLoginDialog = location.state?.showLoginDialog || false;
  console.log(location.state);

  const navigate = useNavigate();
  const closeDialog = () =>
    navigate(location.pathname, {
      replace: true,
      state: { showLoginDialog: false },
    });

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none', // hacky way to disable redirect on email login
    callbacks: {
      signInSuccessWithAuthResult: closeDialog,
    },
  };

  return (
    <Dialog
      open={showLoginDialog}
      onClose={closeDialog}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        Login using your account or email.
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can login using your existing account to authenticate and log in
          to our web-app. You can create an account if you do not want to use
          your existing account to interact with our app.
        </DialogContentText>
        <StyleFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </DialogContent>
    </Dialog>
  );
}
