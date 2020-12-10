import {
  clearFirestoreData,
  initializeTestApp,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';

const MY_PROJECT_ID = 'scholarships-rules-test';
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
  return initializeTestApp({ projectId: MY_PROJECT_ID, auth }).firestore();
}
beforeEach(async () => clearFirestoreData({ projectId: MY_PROJECT_ID }));
afterAll(async () => initializeTestApp({ projectId: MY_PROJECT_ID }).delete());

test('Can read whether you are signed in or not', async () => {
  const testDoc = getFireStore()
    .collection('scholarships')
    .doc('ASDK91023JUS')
    .get();
  await assertSucceeds(testDoc);
});

test('does not write to scholarships doc when signed out', async () => {
  const testDoc = getFireStore()
    .collection('scholarships')
    .doc('H12HASJD9')
    .set(newScholarship);
  await assertFails(testDoc);
});

test('allows write to scholarships doc when signed in', async () => {
  const testDoc = getFireStore(MY_AUTH)
    .collection('scholarships')
    .doc('KJ019JSD')
    .set(newScholarship);
  await assertSucceeds(testDoc);
});
