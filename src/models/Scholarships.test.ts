/**
 * @jest-environment node
 */
import firebase from 'firebase/app';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import ScholarshipAmount from '../types/ScholarshipAmount';
import Scholarships, { converter } from './Scholarships';

const app = initializeTestApp({ projectId: 'scholarship-test' });

// Creates and saves a scholarship with the given data.
function create(data: {
  amount?: ScholarshipAmount | undefined;
  name?: string;
  deadline?: Date;
}) {
  const amount = data.amount ?? ScholarshipAmount.unknown();
  const amountString = ScholarshipAmount.toString(amount);
  const deadline = data.deadline ?? new Date();
  const deadlineString = deadline.toLocaleDateString();
  return Scholarships.new({
    name: data.name ?? `${deadlineString} - ${amountString} scholarship`,
    amount,
    deadline,
    website: 'foo.com',
    description: 'something',
  });
}

// Collection of scholarships with varying amounts
const fixed500 = create({ amount: ScholarshipAmount.fixed(500) });
const fixed5000 = create({ amount: ScholarshipAmount.fixed(5000) });
const range250to1000 = create({ amount: ScholarshipAmount.range(250, 2000) });
const rangeTo500 = create({ amount: ScholarshipAmount.range(undefined, 500) });
const rangeMin500 = create({ amount: ScholarshipAmount.range(500, undefined) });
const fullTuition = create({ amount: ScholarshipAmount.fullTuition() });
const unknown = create({ amount: ScholarshipAmount.unknown() });

const amountScholarships = [
  fixed500,
  fixed5000,
  range250to1000,
  rangeTo500,
  rangeMin500,
  fullTuition,
  unknown,
];

// Collection of scholarships with varying deadlines
const todayDate = new Date();
const oneDay = 1000 * 60 * 60 * 24;
const yesterdayDate = new Date(todayDate.getTime() - oneDay);
const tomorrowDate = new Date(todayDate.getTime() + oneDay);
const [expired, today, tomorrow] = [
  create({ deadline: yesterdayDate }),
  create({ deadline: todayDate }),
  create({ deadline: tomorrowDate }),
];

beforeEach(() =>
  clearFirestoreData(app.options as { projectId: string }).then()
);
afterAll(() => app.delete());

test('converter.toFirestore', () => {
  const deadline = new Date('2019-02-20');
  const data = {
    name: 'scholarship',
    amount: ScholarshipAmount.fixed(2500),
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
  const deadline = new Date('2019-02-20');
  const dateAdded = new Date('2019-01-20');
  const lastModified = new Date('2019-01-23');
  const snapdata: firebase.firestore.DocumentData = {
    name: 'scholarship',
    amount: ScholarshipAmount.fixed(2500),
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
  await Promise.all([today.save(), tomorrow.save()]);

  const got = await Scholarships.list({
    sortField: 'deadline',
    sortDir: 'asc',
  });

  const want = [today, tomorrow];
  expect(got.results.map(extractName)).toEqual(want.map(extractName));
});

test('scholarships.list - sort by deadline desc', async () => {
  await Promise.all([today.save(), tomorrow.save()]);

  const got = await Scholarships.list({
    sortField: 'deadline',
    sortDir: 'desc',
  });

  const want = [tomorrow, today];
  expect(got.results.map(extractName)).toEqual(want.map(extractName));
});

test('scholarships.list - sort by amount.min asc', async () => {
  await Promise.all(amountScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    sortField: 'amount.min',
    sortDir: 'asc',
  });

  const want = [
    rangeTo500,
    range250to1000,
    fixed500,
    rangeMin500,
    fixed5000,
    fullTuition,
    unknown,
  ];
  expect(got.results.map(extractName)).toEqual(want.map(extractName));
});

test('scholarships.list - sort by amount.max desc', async () => {
  await Promise.all(amountScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    sortField: 'amount.max',
    sortDir: 'desc',
  });

  const want = [
    fullTuition,
    rangeMin500,
    fixed5000,
    range250to1000,
    fixed500,
    rangeTo500,
    unknown,
  ];
  expect(got.results.map(extractName)).toEqual(want.map(extractName));
});

test('scholarships.list - filters by minAmount', async () => {
  await Promise.all(amountScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    minAmount: 1000,
  });

  const want = [fullTuition, fixed5000, range250to1000, rangeMin500, unknown];
  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});

test('scholarships.list - filters by maxAmount', async () => {
  await Promise.all(amountScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    maxAmount: 500,
  });

  const want = [rangeMin500, range250to1000, fixed500, rangeTo500, unknown];
  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});

test('scholarships.list - shows expired by default', async () => {
  await Promise.all([expired.save(), today.save(), tomorrow.save()]);

  const got = await Scholarships.list({});

  const want = [expired, today, tomorrow];
  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});

test('scholarships.list - hideExpired sorting by deadline', async () => {
  await Promise.all([expired.save(), today.save(), tomorrow.save()]);

  const got = await Scholarships.list({
    hideExpired: true,
    sortField: 'deadline',
    sortDir: 'asc',
  });

  const want = [today, tomorrow];
  expect(got.results.map(extractName)).toEqual(want.map(extractName));
});

test('scholarships.list - hideExpired sorting by amount', async () => {
  await Promise.all([expired.save(), today.save(), tomorrow.save()]);

  const got = await Scholarships.list({
    hideExpired: true,
    sortField: 'amount.min',
    sortDir: 'asc',
  });

  const want = [tomorrow, today];
  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});
