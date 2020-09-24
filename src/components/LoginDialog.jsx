import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import firebase from 'firebase';
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import PropTypes from 'prop-types';

class LoginDialog extends React.Component {
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none', // hacky way to disable redirect on email login
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Login using your account or email.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can login using your existing account to authenticate and log in to
            our web-app. You can create an account if you do not want to use your
            existing account to interact with our app.
          </DialogContentText>
          <StyleFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        </DialogContent>
      </Dialog>
    );
  }
}

LoginDialog.propTypes = {
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginDialog;
