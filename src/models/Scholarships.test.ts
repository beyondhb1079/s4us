import { firestore } from 'firebase';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import AmountType from '../types/AmountType';
import ScholarshipAmount from '../types/ScholarshipAmount';
import { converter } from './Scholarships';

const app = initializeTestApp({ projectId: 'scholarship-test' });

beforeEach(async () =>
  clearFirestoreData(app.options as { projectId: string })
);
afterAll(async () => app.delete());

test('converter.toFirestore', () => {
  const data = {
    name: 'scholarship',
    amount: new ScholarshipAmount({
      min: 2500,
      max: 2500,
      type: AmountType.Fixed,
    }),
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
    amount: { min: 2500, max: 2500, type: AmountType.Fixed },
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
