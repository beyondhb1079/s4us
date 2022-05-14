import React, { createContext } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
// Saves ~150kB and 250ms when not used in prod
// import { connectAuthEmulator, getAuth } from 'firebase/auth';
// import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

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

  if (getApps().length === 0) {
    // eslint-disable-next-line no-console
    console.log(`Environment: ${JSON.stringify(process.env.NODE_ENV)}`);
    const prod = window.location.host === 'dreamscholars.org';
    const app = initializeApp(prod ? prodConfig : stagingConfig);
    if (process.env.NODE_ENV === 'production') {
      getAnalytics(app);
    } else {
      // Lazily connect to emulators in non-prod environments.
      // TODO: Double check this works
      import('firebase/firestore').then(
        ({ getFirestore, connectFirestoreEmulator }) => {
          connectFirestoreEmulator(getFirestore(app), 'localhost', 8080);
        }
      );
      import('firebase/auth').then(({ getAuth, connectAuthEmulator }) => {
        connectAuthEmulator(getAuth(app), 'http://localhost:9099');
      });
    }
  }

  return (
    <FirebaseContext.Provider value={null}>{children}</FirebaseContext.Provider>
  );
}
