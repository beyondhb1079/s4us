import { clearFirestoreData } from '@firebase/rules-unit-testing';
import firebase, { firestore } from 'firebase';
import { converter } from './Scholarships';

const app = firebase.initializeApp({ projectId: 'scholarship-test' });
app.firestore().settings({
  host: 'localhost:8080',
  ssl: false,
});

beforeEach(async () =>
  clearFirestoreData(app.options as { projectId: string })
);
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
    {}
  );

  expect(got).toEqual({ ...snapdata, deadline: new Date('2019-02-20') });
});
