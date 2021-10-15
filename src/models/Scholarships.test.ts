/**
 * @jest-environment node
 */
import firebase from 'firebase/app';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import AmountType from '../types/AmountType';
import ScholarshipAmount from '../types/ScholarshipAmount';
import Scholarships, { converter } from './Scholarships';

const app = initializeTestApp({ projectId: 'scholarship-test' });

// Creates a scholarship to be stored with the given amount.
// The deadline is set to the time this function is called + index ms.
function create(amount: ScholarshipAmount, index: number) {
  return Scholarships.new({
    name: ScholarshipAmount.toString(amount),
    amount,
    deadline: new Date(new Date().getTime() + index),
    website: 'foo.com',
    description: 'some description',
  });
}

// All scholarships, sorted by deadline
const scholarships = [
  create(new ScholarshipAmount(AmountType.Fixed, { min: 500, max: 500 }), 1),
  create(new ScholarshipAmount(AmountType.Fixed, { min: 5000, max: 5000 }), 2),
  create(new ScholarshipAmount(AmountType.Varies, { min: 250, max: 2000 }), 3),
  create(new ScholarshipAmount(AmountType.Varies, { max: 500 }), 4),
  create(new ScholarshipAmount(AmountType.Varies, { min: 500 }), 5),
  create(new ScholarshipAmount(AmountType.FullTuition), 6),
  create(new ScholarshipAmount(AmountType.Varies), 7),
];

// Readable names for all the scholarships.
const [
  fixed500,
  fixed5000,
  range250to1000,
  rangeTo500,
  rangeMin500,
  fullTuition,
  unknown,
] = scholarships;

beforeAll(() =>
  clearFirestoreData(app.options as { projectId: string }).then(() =>
    Promise.all(scholarships.map((s) => s.save()))
  )
);
afterAll(() => app.delete());

const deadline = new Date('2019-02-20');
const dateAdded = new Date('2019-01-20');
const lastModified = new Date('2019-01-23');

test('converter.toFirestore', () => {
  const data = {
    name: 'scholarship',
    amount: new ScholarshipAmount(AmountType.Fixed, {
      min: 2500,
      max: 2500,
    }),
    description: 'description',
    deadline,
    website: 'mit.com',
    requirements: {
      gpa: 4.0,
      ethnicities: ['Latino', 'African American'],
      majors: ['Computer Science', 'Software Engineering'],
      states: ['California', 'Washington'],
      schools: ['MIT'],
      grades: ['College Freshman'],
    },
    author: {
      id: '123',
      email: 'bobross37@gmail.com',
    },
  };
  const got = converter.toFirestore(data);

  expect(got).toEqual({
    ...data,
    deadline: firebase.firestore.Timestamp.fromDate(deadline),
    dateAdded: null,
    lastModified: null,
  });
});

test('converter.fromFirestore', () => {
  const snapdata: firebase.firestore.DocumentData = {
    name: 'scholarship',
    amount: new ScholarshipAmount(AmountType.Fixed, {
      min: 2500,
      max: 2500,
    }),
    description: 'description',
    deadline: firebase.firestore.Timestamp.fromDate(deadline),
    website: 'mit.com',
    dateAdded: firebase.firestore.Timestamp.fromDate(dateAdded),
    lastModified: firebase.firestore.Timestamp.fromDate(lastModified),
    requirements: {
      gpa: 4.0,
      ethnicities: ['Latino', 'African American'],
      majors: ['Computer Science', 'Software Engineering'],
      states: ['California', 'Washington'],
      schools: ['MIT'],
      grades: ['College Freshman'],
    },
    author: {
      id: 'Bob Ross',
      email: 'bobross37@gmail.com',
    },
  };
  const snapshot = {
    data: () => snapdata,
  };

  const got = converter.fromFirestore(
    snapshot as firebase.firestore.QueryDocumentSnapshot,
    {}
  );

  expect(got).toEqual({
    ...snapdata,
    deadline,
    dateAdded,
    lastModified,
  });
});

const extractName = (s: { data: { name: string } }) => s.data.name;

test('scholarships.list - sort by deadline asc', async () => {
  const want = [
    fixed500,
    fixed5000,
    range250to1000,
    rangeTo500,
    rangeMin500,
    fullTuition,
    unknown,
  ];

  const got = await Scholarships.list({
    sortField: 'deadline',
    sortDir: 'asc',
  });

  expect(got.results.map(extractName)).toEqual(want.map(extractName));
});

test('scholarships.list - sort by amount.min asc', async () => {
  const want = [
    rangeTo500,
    range250to1000,
    fixed500,
    rangeMin500,
    fixed5000,
    fullTuition,
    unknown,
  ];
  const got = await Scholarships.list({
    sortField: 'amount.min',
    sortDir: 'asc',
  });

  expect(got.results.map(extractName)).toEqual(want.map(extractName));
});

test('scholarships.list - sort by amount.max desc', async () => {
  const want = [
    fullTuition,
    rangeMin500,
    fixed5000,
    range250to1000,
    fixed500,
    rangeTo500,
    unknown,
  ];
  const got = await Scholarships.list({
    sortField: 'amount.max',
    sortDir: 'desc',
  });

  expect(got.results.map(extractName)).toEqual(want.map(extractName));
});

test('scholarships.list - filters by minAmount', async () => {
  const want = [fullTuition, fixed5000, range250to1000, rangeMin500, unknown];
  const got = await Scholarships.list({
    minAmount: 1000,
  });

  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});

test('scholarships.list - filters by maxAmount', async () => {
  const want = [rangeMin500, range250to1000, fixed500, rangeTo500, unknown];
  const got = await Scholarships.list({
    maxAmount: 500,
  });

  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});
