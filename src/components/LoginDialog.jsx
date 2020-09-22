import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FirebaseLoginScreen from './FirebaseLoginScreen';

export default function LoginDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">Login using your account or email.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can login using your existing account to authenticate and log in to
          our web-app. You can create an account if you do not want to use your
          existing account to interact with our app.
        </DialogContentText>
        <FirebaseLoginScreen />
      </DialogContent>
    </Dialog>
  );
}
