/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase';
import {
  clearFirestoreData,
  loadFirestoreRules,
} from '@firebase/rules-unit-testing';

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

function initializeTestApp(
  options: { projectId: string },
  rules: string = openRules
): firebase.app.App {
  const app = firebase.initializeApp(options);
  app.firestore().settings({
    host: 'localhost:8080',
    ssl: false,
  });
  loadFirestoreRules({
    projectId: options.projectId,
    rules,
  });
  return app;
}

module.exports = { clearFirestoreData, initializeTestApp };
