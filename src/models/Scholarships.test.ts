/**
 * @jest-environment node
 */

import { User } from 'firebase/auth';
import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { initializeTestEnv } from '../lib/testing';
import AmountType from '../types/AmountType';
import Ethnicity from '../types/Ethnicity';
import GradeLevel from '../types/GradeLevel';
import ScholarshipAmount from '../types/ScholarshipAmount';
import Scholarships, {
  converter,
  requirementMatchesFilter,
  setFakeUser,
} from './Scholarships';

const user = { uid: '123', email: 'bobross37@gmail.com' };
const [env, cleanup] = initializeTestEnv('scholarship-test');

// Creates and saves a scholarship with the given data.
function create(data: {
  amount?: ScholarshipAmount | undefined;
  name?: string;
  deadline?: Date;
  grades?: GradeLevel[];
  majors?: string[];
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
    requirements: { grades: data.grades ?? [], majors: data.majors ?? [] },
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

beforeEach(() => env.then((e) => e.clearFirestore()));
afterAll(() => cleanup());

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
      ethnicities: [
        Ethnicity.HispanicOrLatino,
        Ethnicity.BlackOrAfricanAmerican,
      ],
      majors: ['Computer Science', 'Software Engineering'],
      states: ['California', 'Washington'],
      schools: ['MIT'],
      grades: [GradeLevel.MiddleSchool],
    },
  };
  const got = converter.toFirestore(data);

  expect(got).toMatchObject({
    ...data,
    deadline: Timestamp.fromDate(deadline),
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
  setFakeUser(user as User);
  const got = converter.toFirestore(data);
  setFakeUser(null);

  expect(got).toMatchObject({
    ...data,
    deadline: Timestamp.fromDate(deadline),
    dateAdded: expect.any(Timestamp),
    lastModified: expect.any(Timestamp),
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
    deadline: Timestamp.fromDate(deadline),
    dateAdded: Timestamp.fromDate(dateAdded),
    lastModified: expect.any(Timestamp),
  });
  expect(got.dateAdded).not.toEqual(got.lastModified);
});

test('converter.fromFirestore', () => {
  const deadline = new Date('2019-02-20');
  const dateAdded = new Date('2019-01-20');
  const lastModified = new Date('2019-01-23');
  const snapdata: DocumentData = {
    name: 'scholarship',
    amount: ScholarshipAmount.fixed(2500),
    description: 'description',
    deadline: Timestamp.fromDate(deadline),
    website: 'mit.com',
    dateAdded: Timestamp.fromDate(dateAdded),
    lastModified: Timestamp.fromDate(lastModified),
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

  const got = converter.fromFirestore(snapshot as QueryDocumentSnapshot, {});

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

const middleSchool = create({ grades: [GradeLevel.MiddleSchool] });
const highSchool = create({ grades: GradeLevel.highSchoolers });
const college = create({ grades: GradeLevel.undergrads });
const graduate = create({ grades: GradeLevel.grads });
const gradeScholarships = [middleSchool, highSchool, college, graduate];

test('scholarships.list - filters by grades (middle & high school)', async () => {
  await Promise.all(gradeScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    grades: [
      GradeLevel.MiddleSchool,
      GradeLevel.HsFreshman,
      GradeLevel.HsSophomore,
    ],
  });

  const want = [middleSchool, highSchool];
  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});

test('scholarships.list - filters by grades (all grades)', async () => {
  await Promise.all(gradeScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    grades: [
      GradeLevel.MiddleSchool,
      GradeLevel.HsJunior,
      GradeLevel.CollegeSenior,
      GradeLevel.GraduateThirdYear,
    ],
  });

  const want = [middleSchool, highSchool, college, graduate];
  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});

const arts = create({
  name: 'arts',
  majors: ['Culinary Arts', 'Drama and Theater Arts', 'Liberal Arts'],
});
const engineering = create({
  name: 'engineering',
  majors: [
    'Biomedical Engineering',
    'Chemical Engineering',
    'Civil Engineering',
  ],
});
const socialSciences = create({
  name: 'political science',
  majors: ['History', 'Political Science', 'Sociology'],
});
const majorScholarships = [arts, engineering, socialSciences];

test('scholarships.list - filters by majors (art & social science majors)', async () => {
  await Promise.all(majorScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    majors: ['Liberal Arts', 'History'],
  });

  const want = [arts, socialSciences];
  expect(got.results.map(extractName).sort()).toEqual(
    want.map(extractName).sort()
  );
});

test('scholarships.list - filters by majors (engineering major)', async () => {
  await Promise.all(majorScholarships.map((s) => s.save()));

  const got = await Scholarships.list({
    majors: ['Civil Engineering'],
  });

  const want = [engineering];
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
  const got = Scholarships.new().data;

  expect(got).toMatchObject({
    name: '',
    description: '',
    amount: {
      type: AmountType.Fixed,
      min: 0,
      max: 0,
    },
    deadline: expect.anything(),
    website: '',
  });
});

test('requirementMatchesFilter() - no requirements', () => {
  const filter = [8, 10, 15];
  expect(requirementMatchesFilter(undefined, filter)).toBe(true);
});

test('requirementMatchesFilter() - no param filters', () => {
  const reqs = [8, 10, 15];
  expect(requirementMatchesFilter(reqs, undefined)).toBe(true);
});

test('requirementMatchesFilter() - requirement in param filters', () => {
  const reqs = [9, 10, 20];
  const filter = [8, 10, 15];
  expect(requirementMatchesFilter(reqs, filter)).toBe(true);
});

test('requirementMatchesFilter() - requirement not in param filters', () => {
  const reqs = [7, 13, 14];
  const filter = [8, 10, 15];
  expect(requirementMatchesFilter(reqs, filter)).toBe(false);
});
