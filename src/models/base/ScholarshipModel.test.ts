import firebase from 'firebase/app';
import { clearFirestoreData, initializeTestApp } from '../../lib/testing';
import ScholarshipModel from './ScholarshipModel';

const app = initializeTestApp({ projectId: 'fs-model-test' });

interface ScholarshipData {
  name: string;
  description: string;
  lastModified?: Date;
  dateAdded?: Date;
}

const converter: firebase.firestore.FirestoreDataConverter<ScholarshipData> = {
  toFirestore: (data: ScholarshipData) => ({
    ...data,
    lastModified: data.lastModified
      ? firebase.firestore.Timestamp.fromDate(data.lastModified)
      : null,
    dateAdded: data.dateAdded
      ? firebase.firestore.Timestamp.fromDate(data.dateAdded)
      : null,
  }),
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const dateAdded = (data.dateAdded as firebase.firestore.Timestamp).toDate();
    const lastModified = (
      data.lastModified as firebase.firestore.Timestamp
    ).toDate();
    return { ...data, dateAdded, lastModified } as ScholarshipData;
  },
};

const scholarships = firebase
  .firestore()
  .collection('scholarships')
  .withConverter(converter);

beforeEach(() => clearFirestoreData(app.options as { projectId: string }));
afterAll(() => app.delete());

const data = { name: 'scholarship 1', description: 'this is a test' };

test('save new scholarship - dateAdded and lastModified get set', async () => {
  const ref = scholarships.doc('scholarship 1');
  const scholarship = new ScholarshipModel<ScholarshipData>(ref, data);

  await expect(scholarship.save()).resolves.toBeDefined();

  const got = await scholarships.doc(scholarship.id).get();
  expect(got.data()).toHaveProperty('dateAdded');
  expect(got.data()).toHaveProperty('lastModified');
});

test('save updated scholarship - dateAdded unchanged but lastModified set', async () => {
  const ref = scholarships.doc('scholarship 1');
  const scholarship = new ScholarshipModel<ScholarshipData>(ref, data);
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
