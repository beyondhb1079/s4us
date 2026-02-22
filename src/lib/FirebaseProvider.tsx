import React, { createContext } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

export default function FirebaseProvider(props: {
  children: JSX.Element;
}): JSX.Element {
  const { children } = props;

  if (getApps().length === 0) {
    const app = initializeApp(firebaseConfig);
    /* istanbul ignore if */
    if (import.meta.env.PROD) {
      getAnalytics(app);
    } else {
      // Use emulators in development / test
      connectFirestoreEmulator(getFirestore(app), 'localhost', 8080);
      connectAuthEmulator(getAuth(), 'http://localhost:9099', {
        disableWarnings: import.meta.env.MODE === 'test',
      });
    }
  }

  return (
    <FirebaseContext.Provider value={null}>{children}</FirebaseContext.Provider>
  );
}
