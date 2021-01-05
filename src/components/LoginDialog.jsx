import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase';
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default function LoginDialog() {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return unregisterAuthObserver;
  }, []);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none', // hacky way to disable redirect on email login
    callbacks: {
      signInSuccessWithAuthResult: () => {
        if (location.state) history.push(location.state.from);
        else history.push('/');
      },
    },
  };

  return (
    <Dialog
      open={(params.get('login') === 'true' && !isSignedIn) || false}
      onClose={() => history.push(location.pathname)}
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
