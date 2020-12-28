import {
  clearFirestoreData,
  initializeTestApp,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';

const MY_PROJECT_ID = 'scholarships-rules-test';
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
const authenticatedApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
  auth: { uid: 'alice' },
});
const unathenticatedApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
});

beforeEach(async () => clearFirestoreData({ projectId: MY_PROJECT_ID }));
afterAll(async () => {
  await authenticatedApp.delete();
  await unathenticatedApp.delete();
});

test('Can read whether you are signed in or not', async () => {
  const testDoc = unathenticatedApp
    .firestore()
    .collection('scholarships')
    .doc('ASDK91023JUS')
    .get();
  await assertSucceeds(testDoc);
});

test('does not write to scholarships doc when signed out', async () => {
  const testDoc = unathenticatedApp
    .firestore()
    .collection('scholarships')
    .doc('H12HASJD9')
    .set(newScholarship);
  await assertFails(testDoc);
});

test('allows write to scholarships doc when signed in', async () => {
  const testDoc = authenticatedApp
    .firestore()
    .collection('scholarships')
    .doc('KJ019JSD')
    .set(newScholarship);
  await assertSucceeds(testDoc);
});
