/**
 * @jest-environment node
 */
import { deleteApp } from 'firebase/app';
import { FirestoreDataConverter } from 'firebase/firestore';
import { clearFirestoreData, initializeTestApp } from '../../lib/testing';
import FirestoreCollection from './FirestoreCollection';

const app = initializeTestApp({ projectId: 'fs-collection-test' });

interface NameData {
  first: string;
  last: string;
}

const converter: FirestoreDataConverter<NameData> = {
  toFirestore: (name: NameData) => ({ ...name }),
  fromFirestore: (snapshot) => ({ ...snapshot.data() } as NameData),
};

const names = new (class extends FirestoreCollection<NameData> {
  name = 'names';
  converter = converter;
})();

beforeEach(() => clearFirestoreData(app.options as { projectId: string }));
afterAll(() => deleteApp(app));

test('new() returns model with generated id', () => {
  const got = names.new();

  expect(got.id.length).toBeGreaterThan(0);
  expect(got.data).toMatchObject({});
});

test('new() returns model with data and generated id', () => {
  const data = { first: 'Bob', last: 'Smith' };

  const got = names.new(data);

  expect(got.id.length).toBeGreaterThan(0);
  expect(got.data).toBe(data);
});

test('id() returns model with id', () => {
  const got = names.id('my-id');

  expect(got.id).toEqual('my-id');
});
