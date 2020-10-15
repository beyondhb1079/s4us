import { initializeTestApp, clearFirestoreData } from '@firebase/rules-unit-testing';
import { setDb } from './db';
import Scholarship from './Scholarship';

const testApp = initializeTestApp({ projectId: 'scholarship-test', auth: { uid: 'admin' } });

beforeAll(() => {
  setDb(testApp.firestore());
});

beforeEach(async () => clearFirestoreData(testApp.options as {projectId: string}));

test('constructor generates id', () => {
  const got = new Scholarship();

  expect(got.id.length).toBeGreaterThan(0);
});

test('constructor with id', () => {
  const got = new Scholarship('my-id');

  expect(got.id).toEqual('my-id');
});

test('constructor with data', () => {
  const data = {
    name: 'Foo scholarship',
    amount: 1000,
    description: 'description',
    deadline: new Date('2020-12-17'),
    website: 'foo.com',
  };

  const got = new Scholarship(undefined, data);

  expect(got.data).toBe(data);
});

test('empty list of scholarships', async () => {
  const got = await Scholarship.list();

  expect(got).toHaveLength(0);
});

test('list scholarships', async () => {
  const data1 = {
    name: 'Foo scholarship',
    amount: 1000,
    description: 'description',
    deadline: new Date('2020-12-17'),
    website: 'foo.com',
  };
  const data2 = {
    name: 'Bar scholarship',
    amount: 2000,
    description: 'description',
    deadline: new Date('2020-12-27'),
    website: 'bar.org',
  };
  const scholarship1 = new Scholarship('s1', data1);
  const scholarship2 = new Scholarship('s2', data2);
  await scholarship1.save();
  await scholarship2.save();

  const got = await Scholarship.list();

  expect(got.map((s) => s.id).sort()).toEqual(['s1', 's2']);
});
