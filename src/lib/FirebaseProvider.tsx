import React, { createContext } from 'react';
import firebase from 'firebase';

const FirebaseContext = createContext(null);

// TODO: Extract config into environment variables.
const prodConfig = {
  apiKey: 'AIzaSyAXDqsWK4quNVaf9-YV2e28NsxkfA9rzJA',
  authDomain: 'auth.dreamscholars.org',
  projectId: 'dreamerscholars',
};

const stagingConfig = {
  apiKey: 'AIzaSyA7VN9KOGqUZFE4Z0tVYBjvc1fDF_t__VU',
  authDomain: 'dreamerscholars-staging.firebaseapp.com',
  projectId: 'dreamerscholars-staging',
};

export default function FirebaseProvider(props: {
  children: JSX.Element;
}): JSX.Element {
  const { children } = props;

  if (firebase.apps.length === 0) {
    // eslint-disable-next-line no-console
    console.log(`Environment: ${JSON.stringify(process.env.NODE_ENV)}`);
    if (process.env.NODE_ENV === 'production') {
      const prod = window.location.hostname.endsWith('dreamscholars.org');
      firebase.initializeApp(prod ? prodConfig : stagingConfig);
    } else {
      firebase.initializeApp({
        apiKey: 'fake-api-key',
        authDomain: 'dreamscholars.org',
        projectId: 'dreamerscholars',
      });
      firebase.firestore().useEmulator('localhost', 8080);
      firebase.auth().useEmulator('http://localhost:9099/');
    }
  }
  return (
    <FirebaseContext.Provider value={null}>{children}</FirebaseContext.Provider>
  );
}
