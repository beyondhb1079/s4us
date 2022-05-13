import React, { createContext } from 'react';

const FirebaseContext = createContext(null);

// TODO: Extract config into environment variables.
const prodConfig = {
  apiKey: 'AIzaSyAXDqsWK4quNVaf9-YV2e28NsxkfA9rzJA',
  appId: '1:273882249502:web:7bf1956f56369efc97b10f',
  authDomain: 'auth.dreamscholars.org',
  measurementId: 'G-PW4RT7KGDF',
  projectId: 'dreamerscholars',
};

const stagingConfig = {
  apiKey: 'AIzaSyA7VN9KOGqUZFE4Z0tVYBjvc1fDF_t__VU',
  appId: '1:814425212762:web:b35075077f619348f75563',
  authDomain: 'dreamerscholars-staging.firebaseapp.com',
  measurementId: 'G-SNHQYMD3D4',
  projectId: 'dreamerscholars-staging',
};

export default function FirebaseProvider(props: {
  children: JSX.Element;
}): JSX.Element {
  const { children } = props;

  import('firebase').then((module) => {
    const firebase = module.default;
    if (firebase.apps.length === 0) {
      // eslint-disable-next-line no-console
      console.log(`Environment: ${JSON.stringify(process.env.NODE_ENV)}`);
      if (process.env.NODE_ENV === 'production') {
        const prod = window.location.host === 'dreamscholars.org';
        firebase.initializeApp(prod ? prodConfig : stagingConfig);
        firebase.analytics();
      } else {
        // Initialize app with staging config but use emulator where possible.
        firebase.initializeApp(stagingConfig);
        firebase.firestore().useEmulator('localhost', 8080);
        firebase.auth().useEmulator('http://localhost:9099/');
      }
    }
  });

  return (
    <FirebaseContext.Provider value={null}>{children}</FirebaseContext.Provider>
  );
}
