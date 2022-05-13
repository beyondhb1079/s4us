import { FirebaseApp, initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

if (process.env.NODE_ENV !== 'test') {
  throw Error('this file should only be imported in tests');
}

/**
  Creates and initializes a Firebase app instance for testing.

 * @param options See {@link firebase.initializeApp} for details.
 * @param rules Firestore rules or {@link openRules} by default.
 * @param auth A fake user to initialize the app with.
 *   Use the resulting app.auth() to interact with it from testing environments.
 *   E.g. you can call {@link firebase.auth.Auth.updateCurrentUser} or {@link firebase.auth.Auth.signOut}.
 */
export function initializeTestApp(options: {
  apiKey?: string;
  projectId?: string;
  auth?: { uid?: string; email?: string };
}): FirebaseApp {
  const app = initializeApp({ appId: 'foo', apiKey: 'fake', ...options });
  if (options?.projectId) {
    connectFirestoreEmulator(getFirestore(app), 'localhost', 8080);
  }

  return app;
}

export { clearFirestoreData } from '@firebase/rules-unit-testing';
