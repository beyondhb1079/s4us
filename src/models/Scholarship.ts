import { firestore } from 'firebase';
import FirestoreModel from './FirestoreModel';

interface ScholarshipData {
  // TODO(https://github.com/beyondhb1079/s4us/issues/56):
  // Update this to reflect the schema
  name: string;
  amount: number;
  description: string;
  deadline: Date;
  website: string;
  school?: string;
  year?: string;
}

export const converter: firestore.FirestoreDataConverter<ScholarshipData> = {
  toFirestore: (data: ScholarshipData) => ({
    ...data,
    deadline: firestore.Timestamp.fromDate(data.deadline),
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const deadline = (data.deadline as firestore.Timestamp).toDate();
    return { ...data, deadline } as ScholarshipData;
  },
};

export default class Scholarship extends FirestoreModel<ScholarshipData> {
  static get collection(): firestore.CollectionReference<ScholarshipData> {
    return firestore().collection('scholarships').withConverter(converter);
  }

  /**
   * Represents a scholarship reference.
   * @param {string} id - The scholarship id. Set `undefined` to generate the id.
   * @param {ScholarshipData} data - The scholarship data.
   */
  constructor(id?: string, data?: ScholarshipData) {
    const ref = id
      ? Scholarship.collection.doc(id)
      : Scholarship.collection.doc();
    super(ref, data ?? ({} as ScholarshipData));
  }

  // TODO(issues/93): Support filters, sorting, and pagination
  static list(): Promise<Scholarship[]> {
    return new Promise((resolve, reject) => {
      Scholarship.collection
        .orderBy('deadline')
        .get()
        .then((querySnapshot: firestore.QuerySnapshot<ScholarshipData>) => {
          resolve(
            querySnapshot.docs.map(
              (doc) => new FirestoreModel<ScholarshipData>(doc.ref, doc.data())
            )
          );
        })
        .catch((error) => reject(error));
    });
  }
}
