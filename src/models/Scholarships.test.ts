import { firestore } from 'firebase';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import AmountType from '../types/AmountType';
import ScholarshipAmount from '../types/ScholarshipAmount';
import Scholarships, { converter } from './Scholarships';

const app = initializeTestApp({ projectId: 'scholarship-test' });

// Creates a scholarship to be stored with the given amount.
// The deadline is set to the time this function is called.
function create(amount: ScholarshipAmount) {
  return Scholarships.new({
    name: `${amount.type}: ${amount.min}-${amount.max}`,
    amount,
    deadline: new Date(),
    website: 'foo.com',
    description: 'some description',
  });
}

const [
  fixed500,
  fixed5000,
  range250to1000,
  rangeTo500,
  rangeMin500,
  fullTuition,
  unknown,
] = [
  create({ min: 500, max: 500, type: AmountType.Fixed }),
  create({ min: 5000, max: 5000, type: AmountType.Fixed }),
  create({ min: 250, max: 1000, type: AmountType.Range }),
  create({ min: 0, max: 500, type: AmountType.Range }),
  create({ min: 500, max: 0, type: AmountType.Range }),
  create({ min: 0, max: 0, type: AmountType.FullTuition }),
  create({ min: 0, max: 0, type: AmountType.Unknown }),
];

// All scholarships to be added, sorted by deadline.
const scholarships = [
  fixed500,
  fixed5000,
  range250to1000,
  rangeTo500,
  rangeMin500,
  fullTuition,
  unknown,
];

beforeAll(async () => {
  clearFirestoreData(app.options as { projectId: string });
  await Promise.all(scholarships.map((s) => s.save()));
});
afterAll(async () => app.delete());

test('converter.toFirestore', () => {
  const data = {
    name: 'scholarship',
    amount: new ScholarshipAmount(AmountType.Fixed, {
      min: 2500,
      max: 2500,
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
    amount: new ScholarshipAmount(AmountType.Fixed, {
      min: 2500,
      max: 2500,
    }),
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

  expect(got.map(extractName)).toEqual(want.map(extractName));
});

test('scholarships.list - sort by amount asc', async () => {
  const want = [
    rangeTo500,
    range250to1000,
    fixed500,
    rangeMin500,
    fixed5000,
    fullTuition,
    unknown,
  ];
  const got = await Scholarships.list({ sortField: 'deadline' });

  expect(got.map(extractName)).toEqual(want.map(extractName));
});

test('scholarships.list - sort by amount desc', async () => {
  const want = [
    fullTuition,
    fixed5000,
    range250to1000,
    rangeTo500,
    rangeMin500,
    fixed500,
    unknown,
  ];
  const got = await Scholarships.list({ sortField: 'deadline' });

  expect(got.map(extractName)).toEqual(want.map(extractName));
});
