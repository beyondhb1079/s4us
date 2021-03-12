import { firestore } from 'firebase';
import ScholarshipAmount from '../types/ScholarshipAmount';
import FirestoreCollection from './base/FirestoreCollection';
import FirestoreModel from './base/FirestoreModel';

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

type SortDirection = 'asc' | 'desc';

class Scholarships extends FirestoreCollection<ScholarshipData> {
  name = 'scholarships';
  converter = converter;

  /**
   * Lists all items in this collection.
   *
   * @param opts list options.
   */
  list(
    opts: {
      sortDir?: SortDirection;
      sortField?: string;
      authorId?: string;
    },
    lastDoc: any
  ): any {
    let query: firestore.Query<ScholarshipData> = this.collection;
    // TODO(issues/93, issues/94): Support filters and pagination

    // Sort by requested field + direction
    if (opts.sortField) {
      query = query.orderBy(opts.sortField, opts.sortDir ?? 'asc');
    }
    // Sort ties by deadline earliest to earliest
    if (opts.sortField !== 'deadline') {
      query = query.orderBy('deadline', 'asc');
    }
    if (opts.authorId) {
      query = query.where('authorId', '==', opts.authorId);
    }

    query = query.limit(5).startAfter(lastDoc || 0);

    // const snapShot = await query.get();
    // const last = snapShot.docs[snapShot.docs.length - 1];
    // setLastDoc(last);
    return FirestoreCollection.list(query).then((results) => {
      let lastDocument: any;
      query.get().then((snapshot) => {
        lastDocument = snapshot.docs[snapshot.docs.length - 1];
      });
      const next = () => {
        return this.list(opts, lastDocument);
      };

      return { results, next };
    });
  }
}

const scholarships = new Scholarships();

export default scholarships;
