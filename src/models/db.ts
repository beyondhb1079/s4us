import firebase from 'firebase';
import testing from '@firebase/rules-unit-testing';
import FirebaseConfig from '../config/FirebaseConfig';

let db: firebase.firestore.Firestore | testing.firestore.Firestore;

if (process.env.NODE_ENV !== 'test') {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(FirebaseConfig);
  }
  db = firebase.firestore();
}

const getDb = (): testing.firestore.Firestore => db;
const setDb = (database: testing.firestore.Firestore): void => {
  db = database;
};

export { getDb, setDb };
