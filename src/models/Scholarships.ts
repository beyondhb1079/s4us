import firebase from 'firebase/app';
import ScholarshipAmount from '../types/ScholarshipAmount';
import FirestoreCollection from './base/FirestoreCollection';
import FirestoreModelList from './base/FiretoreModelList';
import FirestoreModel from './base/FirestoreModel';
import ScholarshipData from '../types/ScholarshipData';

export const converter: firebase.firestore.FirestoreDataConverter<ScholarshipData> =
  {
    toFirestore: (data: ScholarshipData) => {
      const user = firebase.auth().currentUser;
      const lastModified = new Date();
      const dateAdded = data.dateAdded ?? lastModified;
      const author = data.author ?? { id: user?.uid, email: user?.email };
      return {
        ...data,
        author,
        amount: ScholarshipAmount.toStorage(data.amount),
        deadline: firebase.firestore.Timestamp.fromDate(data.deadline),
        dateAdded: firebase.firestore.Timestamp.fromDate(dateAdded),
        lastModified: firebase.firestore.Timestamp.fromDate(data.lastModified),
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      const deadline = (data.deadline as firebase.firestore.Timestamp).toDate();
      const dateAdded = (
        data.dateAdded as firebase.firestore.Timestamp
      )?.toDate();
      const lastModified = (
        data.lastModified as firebase.firestore.Timestamp
      )?.toDate();

      return {
        ...data,
        amount,
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
      s.data.amount.intersectsRange(opts.minAmount, opts.maxAmount) &&
      // if opts.sortField is set then the where clause was added
      // otherwise we need to check afterwards
      // TODO(#692): Add a `status` field so we don't need to do this.
      (opts.sortField == 'deadline' || s.data.deadline >= today);

    return FirestoreCollection.list(query, postProcessFilter);
  }
}

const scholarships = new Scholarships();

export default scholarships;
