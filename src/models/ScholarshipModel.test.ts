import firebase from 'firebase/app';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import ScholarshipAmount from '../types/ScholarshipAmount';
import ScholarshipModel from './ScholarshipModel';
import { converter } from './Scholarships';

const app = initializeTestApp({ projectId: 'fs-model-test' });

const scholarships = firebase
  .firestore()
  .collection('scholarships')
  .withConverter(converter);

beforeEach(() => clearFirestoreData(app.options as { projectId: string }));
afterAll(() => app.delete());

const data = {
  name: 'scholarship 1',
  deadline: new Date('December 17, 2021'),
  description: 'this is a test',
  website: 'http://test.com',
  amount: new ScholarshipAmount(),
};

test('save new scholarship - dateAdded and lastModified get set', async () => {
  const ref = scholarships.doc('scholarship 1');
  const scholarship = new ScholarshipModel(ref, data);

  await expect(scholarship.save()).resolves.toBeDefined();

  const got = await scholarships.doc(scholarship.id).get();
  expect(got.data()).toHaveProperty('dateAdded');
  expect(got.data()).toHaveProperty('lastModified');
});

test('save updated scholarship - dateAdded unchanged but lastModified set', async () => {
  const ref = scholarships.doc('scholarship 1');
  const scholarship = new ScholarshipModel(ref, data);
  await scholarship.save();

  const { dateAdded, lastModified, description } = scholarship.data;
  scholarship.data.name = 'updated scholarship';
  await expect(scholarship.save()).resolves.toBeDefined();

  const got = await scholarships.doc(scholarship.id).get();
  expect(got.data()?.dateAdded).toEqual(dateAdded);
  expect(got.data()?.lastModified).not.toEqual(lastModified);
  expect(got.data()?.name).toEqual('updated scholarship');
  expect(got.data()?.description).toEqual(description);
});
