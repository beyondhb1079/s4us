import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  setDoc,
  setLogLevel,
} from 'firebase/firestore';
import { readFileSync } from 'fs';
import AmountType from './types/AmountType';

const scholarship = {
  name: 'test-scholarship',
  deadline: new Date(),
  description: 'this is a test scholarship',
  website: 'https://test.com',
  amount: {
    type: 'UNKNOWN',
    min: 0,
    max: 0,
  },
  dateAdded: new Date(),
  lastModified: new Date(),
  author: { id: 'alice', email: 'alice@gmail.com' },
};
const scholarshipId = 'KLJASDQW';

let testEnv: RulesTestEnvironment;
let unauthedScholarships: CollectionReference<DocumentData>;
let aliceScholarships: CollectionReference<DocumentData>;
let johnScholarships: CollectionReference<DocumentData>;
let adminScholarships: CollectionReference<DocumentData>;

beforeAll(() =>
  initializeTestEnvironment({
    projectId: 'firestore-rules-test',
    firestore: { rules: readFileSync('firestore.rules', 'utf8') },
  }).then((env) => {
    setLogLevel('error'); // Hide statements about expected rejections.
    testEnv = env;
    unauthedScholarships = collection(
      env.unauthenticatedContext().firestore(),
      'scholarships',
    );
    aliceScholarships = collection(
      env.authenticatedContext('alice').firestore(),
      'scholarships',
    );
    johnScholarships = collection(
      env.authenticatedContext('john-doe').firestore(),
      'scholarships',
    );
    adminScholarships = collection(
      env.authenticatedContext('admin', { admin: true }).firestore(),
      'scholarships',
    );
    return setDoc(doc(aliceScholarships, scholarshipId), { ...scholarship });
  }),
);
afterAll(() => testEnv.cleanup());

test('allows scholarships read when signed out', () =>
  assertSucceeds(getDoc(doc(unauthedScholarships, 'ASDK91023JUS'))));

test('allows scholarships read when signed in', () =>
  assertSucceeds(getDoc(doc(aliceScholarships, 'ASDK91023JUS'))));

test('denies scholarships write when signed out', () =>
  assertFails(setDoc(doc(unauthedScholarships), scholarship)));

test('allows scholarships create when signed in', () =>
  assertSucceeds(setDoc(doc(aliceScholarships), { ...scholarship })));

test('denies scholarships update when user is not author', () =>
  assertFails(
    setDoc(doc(johnScholarships, scholarshipId), { name: 'updated name' }),
  ));

test('allows scholarships update when user is author', () =>
  assertSucceeds(
    setDoc(doc(aliceScholarships, scholarshipId), {
      ...scholarship,
      name: 'updated name',
    }),
  ));

test('allows scholarships update when user is admin', () =>
  assertSucceeds(
    setDoc(doc(adminScholarships, scholarshipId), {
      ...scholarship,
      name: 'updated name',
    }),
  ));

test('denies scholarship delete when user is not author', () =>
  assertFails(deleteDoc(doc(johnScholarships, scholarshipId))));

test('allows scholarship delete when user is author', () =>
  assertSucceeds(
    setDoc(doc(aliceScholarships, 'author-delete'), { ...scholarship }),
  ).then(() =>
    assertSucceeds(deleteDoc(doc(aliceScholarships, 'author-delete'))),
  ));

test('allows scholarship delete when user is admin', () =>
  assertSucceeds(
    setDoc(doc(aliceScholarships, 'admin-delete'), { ...scholarship }),
  ).then(() =>
    assertSucceeds(deleteDoc(doc(adminScholarships, 'admin-delete'))),
  ));

describe('validation rules reject scholarship when', () => {
  const createDoc = (data: { [key: string]: unknown }) =>
    setDoc(doc(aliceScholarships), { ...scholarship, ...data });

  test('invalid on create', () => assertFails(createDoc({ name: 34 })));

  test('invalid on update', () =>
    assertFails(
      setDoc(doc(aliceScholarships, scholarshipId), {
        ...scholarship,
        name: 34,
      }),
    ));

  test('name is not a string', () => assertFails(createDoc({ name: 34 })));

  test('amount type is not in AmountType', () =>
    assertFails(createDoc({ amount: { type: 'random', min: 0, max: 0 } })));

  test('amount min/max is not an integer', () =>
    assertFails(
      createDoc({ amount: { type: AmountType.Varies, min: false, max: '0' } }),
    ));

  test('description is not a string', () =>
    assertFails(createDoc({ description: 43 })));

  test('deadline is not a Date', () =>
    assertFails(createDoc({ deadline: 43 })));

  test('website is not a string', () =>
    assertFails(createDoc({ website: 43 })));

  test('organization is not a string', () =>
    assertFails(createDoc({ organization: 23 })));

  test('tags is not a list', () => assertFails(createDoc({ tags: 'list' })));

  test('dateAdded is not a Date', () =>
    assertFails(createDoc({ dateAdded: 43 })));

  test('lastModified is not a Date', () =>
    assertFails(createDoc({ lastModified: 43 })));

  test('author is not an object', () =>
    assertFails(createDoc({ author: '{}' })));

  test('author id is not a string', () =>
    assertFails(
      createDoc({
        author: { id: 2, email: 'test@gmail.com' },
      }),
    ));

  test('author email is not a string', () =>
    assertFails(
      createDoc({
        author: { email: 2, id: scholarship.author.id },
      }),
    ));

  describe('requirements...', () => {
    test('is not an object', () =>
      assertFails(createDoc({ requirements: 3.4 })));

    test('gpa is not a number', () =>
      assertFails(createDoc({ requirements: { gpa: '3.0' } })));

    test('gpa is not greater than 0', () =>
      assertFails(createDoc({ requirements: { gpa: -3 } })));

    test('gpa is not not greater than 4', () =>
      assertFails(createDoc({ requirements: { gpa: 4.1 } })));

    test('ethnicities is not a list', () =>
      assertFails(createDoc({ requirements: { ethnicities: '[]' } })));

    test('majors is not a list', () =>
      assertFails(createDoc({ requirements: { majors: 'history' } })));

    test('schools is not a list', () =>
      assertFails(createDoc({ requirements: { schools: 'UCI' } })));

    test('grades is not a list', () =>
      assertFails(createDoc({ requirements: { grades: 8 } })));

    test('states is not a list', () =>
      assertFails(createDoc({ requirements: { states: 'WA' } })));

    test('genders is not a list', () =>
      assertFails(createDoc({ requirements: { genders: 'MALE' } })));
  });
});
