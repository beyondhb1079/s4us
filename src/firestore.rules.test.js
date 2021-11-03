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
const authedApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
  auth: { uid: 'alice' },
});
const unauthedApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
});
/*
const authedApp2 = initializeTestApp({
  projectId: MY_PROJECT_ID,
  auth: { uid: 'john-doe' },
});

const converter = {
  toFirestore: (data) => {
    const user = { uid: 'alice', email: 'test' };
    const author =
      data.author ?? (user ? { id: user?.uid, email: user?.email } : {});

    console.log({ ...data, author });
    return { ...data, author };
  },
};*/

beforeEach(() => clearFirestoreData({ projectId: MY_PROJECT_ID }));
afterAll(() => Promise.all([authedApp.delete(), unauthedApp.delete()]));

test('Can read whether you are signed in or not', () => {
  const testDoc = unauthedApp
    .firestore()
    .collection('scholarships')
    .doc('ASDK91023JUS')
    .get();
  return assertSucceeds(testDoc);
});

test('does not write to scholarships doc when signed out', () => {
  const testDoc = unauthedApp
    .firestore()
    .collection('scholarships')
    .doc('H12HASJD9')
    .set(newScholarship);
  return assertFails(testDoc);
});

test('allows write to scholarships doc when signed in', () => {
  const testDoc = authedApp
    .firestore()
    .collection('scholarships')
    .doc('KJ019JSD')
    .set(newScholarship);
  return assertSucceeds(testDoc);
});

test('allows edit when you are author of scholarship', async () => {
  await assertSucceeds(
    authedApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set(newScholarship)
  );

  return assertSucceeds(
    authedApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, name: 'update name' })
  );
});

/* TODO: specify the Firestore connection for our Firestore collections
test('does not update scholarship when different user', async () => {
  await assertSucceeds(
    authedApp
      .firestore()
      .collection('scholarships')
      .withConverter(converter)
      .doc('KLJASDQW')
      .set(newScholarship)
  );

  return assertFails(
    authedApp2
      .firestore()
      .collection('scholarships')
      .withConverter(converter)
      .doc('KLJASDQW')
      .set({ name: 'updated name' })
  );
}); */
