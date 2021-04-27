import React, { createContext } from 'react';
import firebase from 'firebase';

const FirebaseContext = createContext(null);

const config = {
  // TODO (issues/213): Configure a separate staging project.
  // These values should really be read from the environment.
  apiKey: 'AIzaSyAXDqsWK4quNVaf9-YV2e28NsxkfA9rzJA',
  authDomain: 'dreamerscholars.firebaseapp.com',
  projectId: 'dreamerscholars',
};

export default function FirebaseProvider(props: {
  children: JSX.Element;
}): JSX.Element {
  const { children } = props;

  if (firebase.apps.length === 0) {
    // eslint-disable-next-line no-console
    console.log(`Environment: ${JSON.stringify(process.env.NODE_ENV)}`);
    if (process.env.NODE_ENV === 'production') {
      firebase.initializeApp(config);
    } else {
      firebase.initializeApp({
        apiKey: 'fake-api-key',
        authDomain: 'dreamscholars.org',
        projectId: 'dreamerscholars',
      });
      firebase.firestore().settings({ host: 'localhost:8080', ssl: false });
      firebase.auth().useEmulator('http://localhost:9099/');
    }
  }
  return (
    <FirebaseContext.Provider value={null}>{children}</FirebaseContext.Provider>
  );
}
