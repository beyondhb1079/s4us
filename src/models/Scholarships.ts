import { firestore } from 'firebase';
import ScholarshipAmount from '../types/ScholarshipAmount';
import FirestoreCollection from './base/FirestoreCollection';

interface ScholarshipData {
  // TODO(https://github.com/beyondhb1079/s4us/issues/56):
  // Update this to reflect the schema
  name: string;
  amount: ScholarshipAmount;
  description: string;
  deadline: Date;
  website: string;
  school?: string;
  year?: string;
  authorId?: string;
  authorEmail?: string;
}

export const converter: firestore.FirestoreDataConverter<ScholarshipData> = {
  toFirestore: (data: ScholarshipData) => ({
    ...data,
    amount: {
      type: data.amount.type,
      min: data.amount.min,
      max: data.amount.max,
    },
    deadline: firestore.Timestamp.fromDate(data.deadline),
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const deadline = (data.deadline as firestore.Timestamp).toDate();
    const amount = new ScholarshipAmount(data.amount.type, data.amount);
    return { ...data, amount, deadline } as ScholarshipData;
  },
};

class Scholarships extends FirestoreCollection<ScholarshipData> {
  name = 'scholarships';
  converter = converter;
}

const scholarships = new Scholarships();

export default scholarships;
