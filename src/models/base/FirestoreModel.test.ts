import {
  collection,
  doc,
  FirestoreDataConverter,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { initializeTestEnv } from '../../lib/testing';
import FirestoreModel from './FirestoreModel';

const [env, cleanup] = initializeTestEnv('fs-model-test');

interface NameData {
  first: string;
  last: string;
}

const converter: FirestoreDataConverter<NameData> = {
  toFirestore: (name: NameData) => ({ ...name }),
  fromFirestore: (snapshot) => ({ ...snapshot.data() } as NameData),
};

const names = collection(getFirestore(), 'names').withConverter(converter);

beforeAll(() => env.then((e) => e.clearFirestore()));
afterAll(() => cleanup());

test('constructor', () => {
  const data = { first: 'Bob', last: 'Smith' };

  const name = new FirestoreModel<NameData>(doc(names, '123'), data);

  expect(name.data).toBe(data);
  expect(name.id).toBe('123');
});

test('get unknown doc', async () => {
  const name = new FirestoreModel<NameData>(doc(names, 'unknown'), {
    first: 'Bob',
    last: 'Smith',
  });

  return expect(name.get()).rejects.toThrowError('names/unknown not found');
});

test('get existing doc', async () => {
  const ref = doc(names, 'get-existing');
  const data = { first: 'Bob', last: 'Smith' };
  await setDoc(ref, data);
  const name = new FirestoreModel<NameData>(ref, data);

  await expect(name.get()).resolves.toEqual(name);
});

test('save creates new doc', async () => {
  const ref = doc(names, 'new');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new FirestoreModel<NameData>(ref, data);

  await expect(name.save()).resolves.toBeDefined();

  const got = await getDoc(doc(names, name.id));
  expect(got.data()).toEqual({ first: 'Bob', last: 'Smith' });
});

test('save updates existing doc', async () => {
  const ref = doc(names, 'update-existing');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new FirestoreModel<NameData>(ref, data);
  await name.save();

  name.data.first = 'Jane';
  await expect(name.save()).resolves.toBeDefined();

  const got = await getDoc(doc(names, name.id));
  expect(got.data()).toEqual({ first: 'Jane', last: 'Smith' });
});

test('delete unknown doc', async () => {
  const ref = doc(names, 'unknown');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new FirestoreModel<NameData>(ref, data);

  await expect(name.delete()).resolves.toBeUndefined();

  const got = await getDoc(doc(names, name.id));
  expect(got.exists()).toBeFalsy();
});

test('delete existing doc', async () => {
  const ref = doc(names, 'delete-existing');
  const data = { first: 'Bob', last: 'Smith' };
  const name = new FirestoreModel<NameData>(ref, data);
  await name.save();

  await expect(name.delete()).resolves.toBeUndefined();

  const got = await getDoc(doc(names, name.id));
  expect(got.exists()).toBeFalsy();
});
