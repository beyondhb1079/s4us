import { firestore } from 'firebase';
import ScholarshipAmount from '../types/ScholarshipAmount';
import FirestoreCollection from './base/FirestoreCollection';
import FirestoreModel from './base/FirestoreModel';
import SortDirection from './base/SortDirection';
import AmountType from '../types/AmountType';

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

  // TODO(issues/93, issues/94): Support filters and pagination
  /**
   * Lists all items in this collection.
   *
   * @param opts list options.
   */
  list(
    opts: {
      sortDir?: SortDirection;
      sortField?: string;
    } = { sortDir: 'asc' }
  ): Promise<FirestoreModel<ScholarshipData>[]> {
    if (opts.sortField !== 'amount') {
      return super.list(opts);
    }

    const baseQuery = this.collection
      .orderBy(opts.sortDir === 'asc' ? 'amount.min' : 'amount.max', opts.sortDir)
      .orderBy('deadline', 'asc');
    const orderedQuery = baseQuery
      .where('amount.type', 'in', [AmountType.Fixed, AmountType.Range]);
    const fullTuitionQuery = baseQuery.where('amount.type', '==', AmountType.FullTuition);
    const unknownQuery = baseQuery.where('amount.type', '==', AmountType.Unknown);

    const queries = opts.sortDir === 'asc'
      ? [orderedQuery.get(), fullTuitionQuery.get(), unknownQuery.get()]
      : [fullTuitionQuery.get(), orderedQuery.get(), unknownQuery.get()];

    return new Promise((resolve, reject) =>
      Promise.all(queries)
        .then((qSnapshots: firestore.QuerySnapshot<ScholarshipData>[]) => {
          const results = [];
          // Double check: for var of goes in order
          for (var qSnapshot of qSnapshots) {
            const transformed = qSnapshot.docs.map((doc) => new FirestoreModel<ScholarshipData>(doc.ref, doc.data()));
            results.push(...transformed);
          }

          resolve(results);
        })
        .catch(reject)
    );
  }
}

const scholarships = new Scholarships();

export default scholarships;
