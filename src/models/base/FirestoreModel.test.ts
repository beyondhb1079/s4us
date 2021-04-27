import firebase from 'firebase/app';
import { clearFirestoreData, initializeTestApp } from '../../lib/testing';
import FirestoreModel from './FirestoreModel';

const app = initializeTestApp({ projectId: 'fs-model-test' });

interface NameData {
  first: string;
  last: string;
}

const converter: firebase.firestore.FirestoreDataConverter<NameData> = {
  toFirestore: (name: NameData) => ({ ...name }),
  fromFirestore: (snapshot) => ({ ...snapshot.data() } as NameData),
};

const names = firebase.firestore().collection('names').withConverter(converter);

beforeEach(() => clearFirestoreData(app.options as { projectId: string }));
afterAll(() => app.delete());

test('constructor', () => {
  const data = { first: 'Bob', last: 'Smith' };

  const name = new FirestoreModel<NameData>(names.doc('123'), data);

  expect(name.data).toBe(data);
  expect(name.id).toBe('123');
});

test('get unknown doc', async () => {
  const name = new FirestoreModel<NameData>(names.doc('123'), {
    first: 'Bob',
    last: 'Smith',
  });

  // TODO(issues/356): investigate "No matching allow statements"
  // message that sometimes appears.
  // await expect(name.get()).rejects.toThrowError('names/123 not found');
  await expect(name.get()).rejects.toThrowError();
});

test('get existing doc', async () => {
  const ref = names.doc('123');
  const data = { first: 'Bob', last: 'Smith' };
  await ref.set(data);
  const name = new FirestoreModel<NameData>(ref, data);

  await expect(name.get()).resolves.toEqual(name);
});

test('save creates new doc', async () => {
  const ref = names.doc('123');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new FirestoreModel<NameData>(ref, data);

  await expect(name.save()).resolves.toBeDefined();

  const got = await names.doc(name.id).get();
  expect(got.data()).toEqual({ first: 'Bob', last: 'Smith' });
});

test('save updates existing doc', async () => {
  const ref = names.doc('123');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new FirestoreModel<NameData>(ref, data);
  await name.save();

  name.data.first = 'Jane';
  await expect(name.save()).resolves.toBeDefined();

  const got = await names.doc(name.id).get();
  expect(got.data()).toEqual({ first: 'Jane', last: 'Smith' });
});

test('delete unknown doc', async () => {
  const ref = names.doc('123');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new FirestoreModel<NameData>(ref, data);

  await expect(name.delete()).resolves.toBeUndefined();

  const got = await names.doc(name.id).get();
  expect(got.exists).toBeFalsy();
});

test('delete existing doc', async () => {
  const ref = names.doc('123');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new FirestoreModel<NameData>(ref, data);
  await name.save();

  await expect(name.delete()).resolves.toBeUndefined();

  const got = await names.doc(name.id).get();
  expect(got.exists).toBeFalsy();
});

// TODO(issues/92): Add tests for subscribe().
