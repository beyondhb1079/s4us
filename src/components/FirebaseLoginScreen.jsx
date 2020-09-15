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

  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      isSignedIn: false,
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
    });
  }

  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <span>
            <button type="button" className="button" onClick={() => firebase.auth().signOut()}>Sign out!</button>
          </span>
        ) : (
          <StyleFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        )}
      </div>
    );
  }
}

export default FirebaseLoginScreen;
