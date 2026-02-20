import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { deleteApp, initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  throw Error('this file should only be imported in tests');
}

const rules = `
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if true;
      }
    }
  }
`;

/**
  Creates and initializes a Firebase app and test env for testing.
 * @param projectId the ID of the project to use.
 */
export function initializeTestEnv(
  projectId?: string,
): [Promise<RulesTestEnvironment>, () => Promise<void>] {
  const app = initializeApp({ appId: 'foo', apiKey: 'fake', projectId });
  connectFirestoreEmulator(getFirestore(app), 'localhost', 8080);
  const env = initializeTestEnvironment({ projectId, firestore: { rules } });
  const cleanup = () => env.then((e) => e.cleanup().then(() => deleteApp(app)));

  return [env, cleanup];
}
