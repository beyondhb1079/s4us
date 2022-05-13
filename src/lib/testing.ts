import { loadFirestoreRules } from '@firebase/rules-unit-testing';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

if (process.env.NODE_ENV !== 'test') {
  throw Error('this file should only be imported in tests');
}

const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
`;

/**
  Creates and initializes a Firebase app instance for testing.
 * @param options See {@link initializeApp} for details.
 */
export function initializeTestApp(options: {
  apiKey?: string;
  projectId?: string;
}): FirebaseApp {
  const app = initializeApp({ appId: 'foo', apiKey: 'fake', ...options });
  if (options?.projectId) {
    connectFirestoreEmulator(getFirestore(app), 'localhost', 8080);
    loadFirestoreRules({ projectId: options.projectId, rules });
  }

  return app;
}

export { clearFirestoreData } from '@firebase/rules-unit-testing';
