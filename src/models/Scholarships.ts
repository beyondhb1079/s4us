import firebase from 'firebase/app';
import ScholarshipAmount from '../types/ScholarshipAmount';
import FirestoreCollection from './base/FirestoreCollection';
import FirestoreModelList from './base/FiretoreModelList';
import FirestoreModel from './base/FirestoreModel';
import ScholarshipModel from './ScholarshipModel';
import ScholarshipData from '../types/ScholarshipData';
import AmountType from '../types/AmountType';

export const converter: firebase.firestore.FirestoreDataConverter<ScholarshipData> =
  {
    toFirestore: (data: ScholarshipData) => ({
      ...data,
      amount: ScholarshipAmount.fromStorage(data.amount),
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

      return {
        ...data,
        amount: ScholarshipAmount.toStorage(data.amount),
        deadline,
        dateAdded,
        lastModified,
      } as ScholarshipData;
    },
  };

class Scholarships extends FirestoreCollection<ScholarshipData> {
  name = 'scholarships';
  converter = converter;

  /**
   * Lists all items in this collection.
   *
   * @param opts filter and sorting options.
   */
  list(opts: {
    authorId?: string;
    hideExpired?: boolean;
    minAmount?: number;
    maxAmount?: number;
    sortDir?: 'asc' | 'desc';
    sortField?: string;
  }): Promise<FirestoreModelList<ScholarshipData>> {
    let query: firebase.firestore.Query<ScholarshipData> = this.collection;

    // Set default sorting field and direction if they're not set
    if (!opts.sortField) opts.sortField = 'deadline';
    if (!opts.sortDir) opts.sortDir = 'asc';

    // Sort by requested field + direction
    query = query.orderBy(opts.sortField, opts.sortDir);

    // Sort ties by earliest deadline first
    if (opts.sortField !== 'deadline') {
      query = query.orderBy('deadline', 'asc');
    }

    // Apply filter(s)
    //
    // Note: Firestore currently has limitations on how filters can be combined
    // so we cannot apply a range filter operator (e.g. '>') unless the sorting
    // field is the same.
    // https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
    if (opts.authorId) {
      query = query.where('author.id', '==', opts.authorId);
    }

    const now = new Date();
    const today = new Date(now.toDateString());
    if (opts.hideExpired && opts.sortField == 'deadline') {
      query = query.where('deadline', '>=', today);
    }

    // Filter to apply *on* the results. This allows us to apply complex
    // filters Firestore doesn't support.
    //
    // Returning false filters out non-matches.
    const postProcessFilter = (s: FirestoreModel<ScholarshipData>) =>
      ScholarshipAmount.amountsIntersect(s.data.amount, {
        type: AmountType.Varies,
        min: opts.minAmount ?? 0,
        max: opts.maxAmount ?? 0,
      }) &&
      // if opts.sortField is set then the where clause was added
      // otherwise we need to check afterwards
      // TODO(#692): Add a `status` field so we don't need to do this.
      (opts.sortField == 'deadline' || s.data.deadline >= today);

    // TODO: Fix .get() and .list() to work with ScholarshipModel's .save() method
    return FirestoreCollection.list(query, postProcessFilter);
  }

  new(data?: ScholarshipData): ScholarshipModel {
    return new ScholarshipModel(
      this.collection.doc(),
      data ?? ({} as ScholarshipData)
    );
  }
}

const scholarships = new Scholarships();

export default scholarships;
