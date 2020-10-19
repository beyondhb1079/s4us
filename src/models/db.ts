import firebase from 'firebase';
import testing from '@firebase/rules-unit-testing';

let db: firebase.firestore.Firestore | testing.firestore.Firestore;

if (process.env.NODE_ENV !== 'test') {
  db = firebase.firestore();
}

exports.getDb = () => db;

exports.setDb = (database: testing.firestore.Firestore) => {
  db = database;
};
