import React, { Component } from 'react';

import firebase from "firebase"
import StyleFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
   apiKey: "AIzaSyAXDqsWK4quNVaf9-YV2e28NsxkfA9rzJA",
   authDomain: "dreamerscholars.firebaseapp.com"
})

class FirebaseAuth extends Component {
   state = { isSignedIn: false }
   uiConfig = {
      signInFlow: "popup",
      signInOptions: [
         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
         firebase.auth.EmailAuthProvider.PROVIDER_ID,
         firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
         signInSuccess: () => false
      }
   }

   componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
         this.setState({ isSignedIn: !!user })
      })
   }

   render() {
      return (
         <div>
            {this.state.isSignedIn ? (
               <span>
                  <button className="button" onClick={() => firebase.auth().signOut()}>Sign out!</button>
               </span>
            ) : (
                  <StyleFirebaseAuth
                     uiConfig={this.uiConfig}
                     firebaseAuth={firebase.auth()}
                  />
               )}
         </div>
      )
   }
}
export default FirebaseAuth