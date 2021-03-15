import firebase from 'firebase';
import { loadFirestoreRules } from '@firebase/rules-unit-testing';

if (process.env.NODE_ENV !== 'test') {
  throw Error('this file should only be imported in tests');
}

const openRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
`;

export function initializeTestApp(
  options: { apiKey?: string; projectId?: string },
  rules: string = openRules
): firebase.app.App {
  const app = firebase.initializeApp(options);
  if (options?.projectId) {
    app.firestore().settings({
      host: 'localhost:8080',
      ssl: false,
    });
    loadFirestoreRules({
      projectId: options.projectId,
      rules,
    });
  }
  return app;
}

export { clearFirestoreData } from '@firebase/rules-unit-testing';
