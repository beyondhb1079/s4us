import { firestore } from 'firebase';
import { clearFirestoreData, initializeTestApp } from '../../lib/testing';
import FirestoreCollection from './FirestoreCollection';

const app = initializeTestApp({ projectId: 'fs-collection-test' });

interface NameData {
  first: string;
  last: string;
}

const converter: firestore.FirestoreDataConverter<NameData> = {
  toFirestore: (name: NameData) => ({ ...name }),
  fromFirestore: (snapshot) => ({ ...snapshot.data() } as NameData),
};

const names = new (class extends FirestoreCollection<NameData> {
  name = 'names';
  converter = converter;
})();

beforeEach(async () =>
  clearFirestoreData(app.options as { projectId: string })
);
afterAll(async () => app.delete());

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

test('list() returns empty list', async () => {
  const got = await names.list();

  expect(got).toHaveLength(0);
});

test('list() returns items', async () => {
  const bob = names.new({ first: 'Bob', last: 'Smith' });
  const jane = names.new({ first: 'Jane', last: 'Smith' });
  await bob.save();
  await jane.save();

  const got = await names.list();

  expect(got.map((s) => s.id).sort()).toEqual([bob.id, jane.id].sort());
});

test('list() sorts by field', async () => {
  const bob = names.new({ first: 'Bob', last: 'Smith' });
  const jane = names.new({ first: 'Jane', last: 'Smith' });
  await bob.save();
  await jane.save();

  const got = await names.list({ sortField: 'first' });

  expect(got.map((s) => s.id)).toEqual([bob.id, jane.id]);
});

test('list() sorts by field in direction', async () => {
  const bob = names.new({ first: 'Bob', last: 'Smith' });
  const jane = names.new({ first: 'Jane', last: 'Smith' });
  await bob.save();
  await jane.save();

  const got = await names.list({ sortField: 'first', sortDir: 'desc' });

  expect(got.map((s) => s.id)).toEqual([jane.id, bob.id]);
});
