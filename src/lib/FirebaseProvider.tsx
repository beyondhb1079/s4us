import React, { createContext, useEffect } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore/lite';

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default function FirebaseProvider(props: {
  children: JSX.Element;
}): JSX.Element {
  const { children } = props;

  useEffect(() => {
    if (import.meta.env.PROD) {
      // Dynamically import analytics so it doesn't block the initial page load!
      import('firebase/analytics').then(({ getAnalytics }) => {
        getAnalytics(app);
      });
    } else {
      // Use emulators in development / test
      // Vite will completely strip this block out of your production build
      const auth = getAuth(app);

      // Prevent hot-reloading from trying to reconnect emulators twice
      if (!auth.emulatorConfig) {
        connectFirestoreEmulator(getFirestore(app), 'localhost', 8080);
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: import.meta.env.MODE === 'test',
        });
      }
    }
  }, []);

  return (
    <FirebaseContext.Provider value={null}>{children}</FirebaseContext.Provider>
  );
}
