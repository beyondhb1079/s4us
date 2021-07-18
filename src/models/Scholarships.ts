import firebase from 'firebase/app';
import ScholarshipAmount from '../types/ScholarshipAmount';
import FirestoreCollection from './base/FirestoreCollection';
import FirestoreModelList from './base/FiretoreModelList';
import ScholarshipEligibility from '../types/ScholarshipEligibility';
import FirestoreModel from './base/FirestoreModel';
import Model from './base/Model';

export interface ScholarshipData {
  name: string;
  amount: ScholarshipAmount;
  description: string;
  deadline: Date;
  website: string;
  organization?: string;
  tags?: string[];
  dateAdded?: Date;
  lastModified?: Date;
  requirements?: ScholarshipEligibility;
  author?: {
    id?: string;
    email?: string;
  };
}

export const converter: firebase.firestore.FirestoreDataConverter<ScholarshipData> =
  {
    toFirestore: (data: ScholarshipData) => ({
      ...data,
      amount: {
        type: data.amount.type,
        min: data.amount.min,
        max: data.amount.max,
      },
      deadline: firebase.firestore.Timestamp.fromDate(data.deadline),
      dateAdded: data.dateAdded
        ? firebase.firestore.Timestamp.fromDate(data.dateAdded)
        : null,
      lastModified: data.lastModified
        ? firebase.firestore.Timestamp.fromDate(data.lastModified)
        : null,
    }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      const deadline = (data.deadline as firebase.firestore.Timestamp).toDate();
      const dateAdded = data.dateAdded
        ? (data.dateAdded as firebase.firestore.Timestamp).toDate()
        : null;
      const lastModified = data.lastModified
        ? (data.lastModified as firebase.firestore.Timestamp).toDate()
        : null;
      const amount = new ScholarshipAmount(data.amount.type, data.amount);

      return {
        ...data,
        amount,
        deadline,
        dateAdded,
        lastModified,
      } as ScholarshipData;
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
    authorId?: string;
    sortDir?: SortDirection;
    sortField?: string;
    minAmount?: number;
    maxAmount?: number;
  }): Promise<FirestoreModelList<ScholarshipData>> {
    let query: firebase.firestore.Query<ScholarshipData> = this.collection;

    // Sort by requested field + direction
    if (opts.sortField) {
      query = query.orderBy(opts.sortField, opts.sortDir ?? 'asc');
    }
    // Sort ties by deadline earliest to earliest
    if (opts.sortField !== 'deadline') {
      query = query.orderBy('deadline', 'asc');
    }
    if (opts.authorId) {
      query = query.where('author.id', '==', opts.authorId);
    }

    const postProcessFilter = (s: FirestoreModel<ScholarshipData>) =>
      s.data.amount.intersectsRange(opts.minAmount, opts.maxAmount);

    return FirestoreCollection.list(query, postProcessFilter);
  }

  save(data: ScholarshipData): Promise<Model<ScholarshipData>> {
    const Data = { ...data, lastModified: new Date() };
    if (!data.dateAdded) Data.dateAdded = new Date();

    return super.new(Data).save();
  }
}

const scholarships = new Scholarships();

export default scholarships;
