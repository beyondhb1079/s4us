import firebase from 'firebase/app';
import ScholarshipAmount from '../types/ScholarshipAmount';
import FirestoreCollection from './base/FirestoreCollection';
import FirestoreModelList from './base/FiretoreModelList';
import ScholarshipEligibility from '../types/ScholarshipEligibility';

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
  states?: String[];
  eligibility?: ScholarshipEligibility;
}

export const converter: firebase.firestore.FirestoreDataConverter<ScholarshipData> = {
  toFirestore: (data: ScholarshipData) => ({
    ...data,
    amount: {
      type: data.amount.type,
      min: data.amount.min,
      max: data.amount.max,
    },
    deadline: firebase.firestore.Timestamp.fromDate(data.deadline),
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const deadline = (data.deadline as firebase.firestore.Timestamp).toDate();
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
  list(opts: {
    sortDir?: SortDirection;
    sortField?: string;
    authorId?: string;
  }): Promise<FirestoreModelList<ScholarshipData>> {
    let query: firebase.firestore.Query<ScholarshipData> = this.collection;
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

    return FirestoreCollection.list(query);
  }
}

const scholarships = new Scholarships();

export default scholarships;
