/**
 * @jest-environment node
 */

import { FirestoreDataConverter } from 'firebase/firestore';
import { initializeTestEnv } from '../../lib/testing';
import FirestoreCollection from './FirestoreCollection';

const [env, cleanup] = initializeTestEnv('fs-collection-test');

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

beforeEach(() => env.then((e) => e.clearFirestore()));
afterAll(() => cleanup());

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
