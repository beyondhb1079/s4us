import { clearFirestoreData } from '@firebase/rules-unit-testing';
import firebase, { firestore } from 'firebase';
import Scholarship, { converter } from './Scholarship';

const app = firebase.initializeApp({ projectId: 'scholarship-test' });
app.firestore().settings({
  host: 'localhost:8080',
  ssl: false,
});

beforeEach(async () => clearFirestoreData(app.options as { projectId: string }));
afterAll(async () => app.delete());

test('converter.toFirestore', () => {
  const data = {
    name: 'scholarship',
    amount: 2500,
    description: 'description',
    deadline: new Date('2019-02-20'),
    website: 'mit.com',
    school: 'MIT',
    year: 'college freshman',
  };

  const got = converter.toFirestore(data);

  expect(got).toEqual({
    ...data,
    deadline: firestore.Timestamp.fromDate(data.deadline),
  });
});

test('converter.fromFirestore', () => {
  const snapdata: firestore.DocumentData = {
    name: 'scholarship',
    amount: 2500,
    description: 'description',
    deadline: firestore.Timestamp.fromDate(new Date('2019-02-20')),
    website: 'mit.com',
    school: 'MIT',
    year: 'college freshman',
  };
  const snapshot = {
    data: () => snapdata,
  };

  const got = converter.fromFirestore(
    snapshot as firestore.QueryDocumentSnapshot,
    {},
  );

  expect(got).toEqual({ ...snapdata, deadline: new Date('2019-02-20') });
});

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
    deadline: new Date('2019-12-17'),
    website: 'foo.com',
  };
  const data2 = {
    name: 'Bar scholarship',
    amount: 2000,
    description: 'description',
    deadline: new Date('2020-12-27'),
    website: 'bar.org',
  };
  const scholarship1 = new Scholarship('earlier', data1);
  const scholarship2 = new Scholarship('later', data2);
  await scholarship1.save();
  await scholarship2.save();

  const got = await Scholarship.list();

  expect(got.map((s) => s.id)).toEqual(['earlier', 'later']);
});
