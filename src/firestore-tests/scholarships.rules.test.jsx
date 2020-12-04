import * as firebase from '@firebase/testing';

const MY_PROJECT_ID = 'dreamerscholars';
const MY_AUTH = { uid: 'alice', email: 'alice@test.com' };
const newScholarship = {
  name: 'test-scholarship',
  deadline: new Date(),
  description: 'this is a test scholarship',
  amount: {
    type: 'UNKNOWN',
    min: 0,
    max: 0,
  },
};

function getFireStore(auth = null) {
  return firebase
    .initializeTestApp({ projectId: MY_PROJECT_ID, auth })
    .firestore();
}
beforeAll(async () =>
  firebase.clearFirestoreData({ projectId: MY_PROJECT_ID })
);
afterAll(async () => firebase.clearFirestoreData({ projectId: MY_PROJECT_ID }));

test('Can read whether you are signed in or not', async () => {
  const db = getFireStore();
  const testDoc = db.collection('scholarships').doc('ASDK91023JUS');
  await firebase.assertSucceeds(testDoc.get());
});

test('does not write to scholarships doc when signed out', async () => {
  const db = getFireStore();
  const testDoc = db.collection('scholarships').doc('test');
  await firebase.assertFails(testDoc.set(newScholarship));
});

test('allows write to scholarships doc when signed in', async () => {
  const db = getFireStore(MY_AUTH);
  const testDoc = db.collection('scholarships').doc('test');
  await firebase.assertSucceeds(testDoc.set(newScholarship));
});
