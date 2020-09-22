import React, { Component } from 'react';
import firebase from 'firebase';
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class FirebaseLoginScreen extends Component {
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
    return (
      <div>
        <StyleFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
}

export default FirebaseLoginScreen;
