/**
 * @jest-environment node
 */
import firebase from 'firebase/app';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import AmountType from '../types/AmountType';
import GradeLevel from '../types/GradeLevel';
import ScholarshipAmount from '../types/ScholarshipAmount';
import Scholarships, { converter } from './Scholarships';

const user = { uid: '123', email: 'bobross37@gmail.com' };
const app = initializeTestApp({
  projectId: 'scholarship-test',
  apiKey: 'something',
  auth: user,
});

// Creates and saves a scholarship with the given data.
function create(data: {
  amount?: ScholarshipAmount | undefined;
  name?: string;
  deadline?: Date;
  grades?: GradeLevel[];
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
    requirements: { grades: data.grades ?? [] },
  });
}

// Collection of scholarships with varying amounts
const fixed500 = create({ amount: ScholarshipAmount.fixed(500) });
const fixed5000 = create({ amount: ScholarshipAmount.fixed(5000) });
const range250to1000 = create({ amount: ScholarshipAmount.range(250, 2000) });
const rangeTo501 = create({ amount: ScholarshipAmount.range(undefined, 501) });
const rangeMin499 = create({ amount: ScholarshipAmount.range(499, undefined) });
const fullTuition = create({ amount: ScholarshipAmount.fullTuition() });
const unknown = create({ amount: ScholarshipAmount.unknown() });

const amountScholarships = [
  fixed500,
  fixed5000,
  range250to1000,
  rangeTo501,
  rangeMin499,
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

beforeEach(() => clearFirestoreData(app.options as { projectId: string }));
afterAll(() => app.delete());

test('converter.toFirestore stores scholarship data', () => {
  const deadline = new Date('2029-02-20');
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
      grades: [8],
    },
  };
  const got = converter.toFirestore(data);

  expect(got).toMatchObject({
    ...data,
    deadline: firebase.firestore.Timestamp.fromDate(deadline),
  });
});

test('converter.toFirestore sets author, dateAdded, and lastModified for new scholarship', () => {
  const deadline = new Date('2029-02-20');
  const data = {
    name: 'scholarship',
    amount: ScholarshipAmount.fixed(2500),
    description: 'description',
    deadline,
    website: 'mit.com',
  };
  const got = converter.toFirestore(data);

  expect(got).toMatchObject({
    ...data,
    deadline: firebase.firestore.Timestamp.fromDate(deadline),
    dateAdded: expect.any(firebase.firestore.Timestamp),
    lastModified: expect.any(firebase.firestore.Timestamp),
    author: {
      id: user.uid,
      email: user.email,
    },
  });
  expect(got.dateAdded).toEqual(got.lastModified);
});

test('converter.toFirestore only updates lastModified for existing scholarship', () => {
  const deadline = new Date('2029-02-20');
  const dateAdded = new Date('2019-12-21');
  const data = {
    name: 'scholarship',
    amount: ScholarshipAmount.fixed(2500),
    description: 'description',
    deadline,
    website: 'mit.com',
    author: {
      id: 'original author id',
      email: 'original author email',
    },
    dateAdded,
    lastModified: dateAdded,
  };
  const got = converter.toFirestore(data);

  expect(got).toMatchObject({
    ...data,
    deadline: firebase.firestore.Timestamp.fromDate(deadline),
    dateAdded: firebase.firestore.Timestamp.fromDate(dateAdded),
    lastModified: expect.any(firebase.firestore.Timestamp),
  });
  expect(got.dateAdded).not.toEqual(got.lastModified);
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
    rangeTo501,
    range250to1000,
    rangeMin499,
    fixed500,
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
    rangeMin499,
    fixed5000,
    range250to1000,
    rangeTo501,
    fixed500,
    unknown,
  ];
  expect(got.results.map(extractName)).toEqual(want.map(extractName));
});

test('scholarships.list - filters by minAmount', async () => {
  await Promise.all(amountScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    minAmount: 1000,
  });

  const want = [fullTuition, fixed5000, range250to1000, rangeMin499, unknown];
  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});

test('scholarships.list - filters by maxAmount', async () => {
  await Promise.all(amountScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    maxAmount: 500,
  });

  const want = [rangeMin499, range250to1000, fixed500, rangeTo501, unknown];
  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});

const middleSchool = create({ grades: [8] });
const highSchool = create({ grades: [9, 10, 11, 12] });
const college = create({ grades: [13, 14, 15, 16, 17] });
const graduate = create({ grades: [18, 19, 20, 21, 22] });
const gradeScholarships = [middleSchool, highSchool, college, graduate];

test('scholarships.list - filters by grades (middle & high school)', async () => {
  await Promise.all(gradeScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    grades: [8, 9, 10],
  });

  const want = [middleSchool, highSchool];
  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});

test('scholarships.list - filters by grades (all grades)', async () => {
  await Promise.all(gradeScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    grades: [8, 11, 17, 20],
  });

  const want = [middleSchool, highSchool, college, graduate];
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

test('scholarships.new - default values', async () => {
  const spy = jest.spyOn(global, 'Date'); // spy on Date

  const got = Scholarships.new().data;

  expect(got).toMatchObject({
    name: '',
    description: '',
    amount: {
      type: AmountType.Fixed,
      min: 0,
      max: 0,
    },
    deadline: spy.mock.instances[0],
    website: '',
  });
});

test('includesFilter() - no requirements', () => {
  const paramGrades = [8, 10, 15];
  expect(Scholarships.includesFilter(undefined, paramGrades)).toBe(true);
});

test('includesFilter() - no param filters', () => {
  const grades = [8, 10, 15];
  expect(Scholarships.includesFilter(grades, undefined)).toBe(true);
});

test('includesFilter() - requirement in param filters', () => {
  const grades = [9, 10, 20];
  const paramGrades = [8, 10, 15];
  expect(Scholarships.includesFilter(grades, paramGrades)).toBe(true);
});

test('includesFilter() - requirement not in param filters', () => {
  const grades = [7, 13, 14];
  const paramGrades = [8, 10, 15];
  expect(Scholarships.includesFilter(grades, paramGrades)).toBe(false);
});
