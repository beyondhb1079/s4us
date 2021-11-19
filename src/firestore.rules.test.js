/**
 * @jest-environment node
 */
import {
  assertFails,
  assertSucceeds,
  clearFirestoreData,
  initializeTestApp,
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

const unauthedApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
});

const authApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
  auth: { uid: 'alice' },
});

beforeEach(() => clearFirestoreData({ projectId: MY_PROJECT_ID }));
afterAll(() => Promise.all([unauthedApp, authApp].map((c) => c.delete())));

test('allows scholarships read when signed out', () => {
  return assertSucceeds(
    unauthedApp.firestore().collection('scholarships').doc('ASDK91023JUS').get()
  );
});

test('allows scholarships read when signed in', () => {
  return assertSucceeds(
    authApp.firestore().collection('scholarships').doc('ASDK91023JUS').get()
  );
});

test('denies scholarships write when signed out', () => {
  return assertFails(
    unauthedApp.firestore().collection('scholarships').doc().set(newScholarship)
  );
});

test('allows scholarships write when signed in', () => {
  return assertSucceeds(
    authApp.firestore().collection('scholarships').doc().set(newScholarship)
  );
});

test('denies scholarships update when user is not author', async () => {
  await assertSucceeds(
    authApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({
        ...newScholarship,
        author: { id: authApp.auth().currentUser.uid },
      })
  );

  authApp.auth.setCurrentUser({ uid: 'john-doe' });

  return assertFails(
    authApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ name: 'updated name' })
  );
});

test('allows scholarships update when user is author', async () => {
  await assertSucceeds(
    authApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({
        ...newScholarship,
        author: { id: authApp.auth().currentUser.uid },
      })
  );

  return assertSucceeds(
    authApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ name: 'updated name' })
  );
});
