import { initializeTestApp, firestore, clearFirestoreData } from '@firebase/rules-unit-testing';
import FirestoreModel from './FirestoreModel';

const testApp = initializeTestApp({ projectId: 'fs-model-test', auth: { uid: 'admin' } });

interface NameData {
  first: string;
  last: string;
}

const converter: firestore.FirestoreDataConverter<NameData> = {
  toFirestore: (name: NameData) => ({ ...name }),
  fromFirestore: (snapshot, options) => ({ ...snapshot.data(options) } as NameData),
};

class Name extends FirestoreModel<NameData> {
  static readonly collection = testApp.firestore().collection('names').withConverter(converter);
}

beforeEach(async () => clearFirestoreData(testApp.options as {projectId: string}));
afterAll(async () => testApp.delete());

test('constructor', () => {
  const data = { first: 'Bob', last: 'Smith' };

  const name = new Name(Name.collection.doc('123'), data);

  expect(name.data).toBe(data);
  expect(name.id).toBe('123');
});

test('get unknown doc', async () => {
  const name = new Name(Name.collection.doc('123'), { first: 'Bob', last: 'Smith' });

  await expect(name.get()).rejects.toThrowError('names/123 not found');
});

test('get existing doc', async () => {
  const ref = Name.collection.doc('123');
  const data = { first: 'Bob', last: 'Smith' };
  await ref.set(data);
  const name = new Name(ref, data);

  await expect(name.get()).resolves.toEqual(name);
});

test('save creates new doc', async () => {
  const ref = Name.collection.doc('123');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new Name(ref, data);

  await expect(name.save()).resolves.toBeDefined();

  const got = await Name.collection.doc(name.id).get();
  expect(got.data()).toEqual({ first: 'Bob', last: 'Smith' });
});

test('save updates existing doc', async () => {
  const ref = Name.collection.doc('123');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new Name(ref, data);
  await name.save();

  name.data.first = 'Jane';
  await expect(name.save()).resolves.toBeDefined();

  const got = await Name.collection.doc(name.id).get();
  expect(got.data()).toEqual({ first: 'Jane', last: 'Smith' });
});

test('delete unknown doc', async () => {
  const ref = Name.collection.doc('123');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new Name(ref, data);

  await expect(name.delete()).resolves.toBeUndefined();

  const got = await Name.collection.doc(name.id).get();
  expect(got.exists).toBeFalsy();
});

test('delete existing doc', async () => {
  const ref = Name.collection.doc('123');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new Name(ref, data);
  await name.save();

  await expect(name.delete()).resolves.toBeUndefined();

  const got = await Name.collection.doc(name.id).get();
  expect(got.exists).toBeFalsy();
});

// TODO(issues/92): Add tests for subscribe().
