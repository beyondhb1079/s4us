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

const aliceId = 'alice';
const aliceApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
  auth: { uid: aliceId },
});

const johnApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
  auth: { uid: 'john-doe' },
});

beforeEach(() => clearFirestoreData({ projectId: MY_PROJECT_ID }));
afterAll(() =>
  Promise.all([unauthedApp, aliceApp, johnApp].map((c) => c.delete()))
);

test('allows scholarships read when signed out', () => {
  return assertSucceeds(
    unauthedApp.firestore().collection('scholarships').doc('ASDK91023JUS').get()
  );
});

test('allows scholarships read when signed in', () => {
  return assertSucceeds(
    aliceApp.firestore().collection('scholarships').doc('ASDK91023JUS').get()
  );
});

test('denies scholarships write when signed out', () => {
  return assertFails(
    unauthedApp.firestore().collection('scholarships').doc().set(newScholarship)
  );
});

test('allows scholarships write when signed in', () => {
  return assertSucceeds(
    aliceApp.firestore().collection('scholarships').doc().set(newScholarship)
  );
});

test('denies scholarships update when user is not author', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, author: { id: aliceId } })
  );

  return assertFails(
    johnApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ name: 'updated name' })
  );
});

test('allows scholarships update when user is author', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, author: { id: aliceId } })
  );

  return assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ name: 'updated name' })
  );
});

test('allow scholarship delete when user is author', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, author: { id: aliceId } })
  );

  return assertSucceeds(
    aliceApp.firestore().collection('scholarships').doc('KLJASDQW').delete()
  );
});

test('denies scholarship delete when user is not author', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, author: { id: aliceId } })
  );

  return assertFails(
    johnApp.firestore().collection('scholarships').doc('KLJASDQW').delete()
  );
});
