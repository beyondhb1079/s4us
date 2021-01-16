import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase';
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default function LoginDialog() {
  const location = useLocation();
  const { showLoginDialog } = location.state || { showLoginDialog: false };
  const history = useHistory();

  const closeDialog = () =>
    history.replace({ state: { showLoginDialog: false } });
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
