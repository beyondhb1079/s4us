import firebase from 'firebase/app';
import ScholarshipAmount from '../types/ScholarshipAmount';
import FirestoreCollection from './base/FirestoreCollection';
import FirestoreModelList from './base/FiretoreModelList';
import FirestoreModel from './base/FirestoreModel';
import ScholarshipData from '../types/ScholarshipData';
import AmountType from '../types/AmountType';
import GradeLevel from '../types/GradeLevel';

/**
 *
 * @param reqs is the scholarship requirements e.g. (grades, states, etc.)
 * @param paramFilters
 * @returns true when any of the following conditions are met:
 * - there are no requirements
 * - there are no filters
 * - the requirement list intersects with the filter list
 */
export function requirementMatchesFilter(
  reqs?: any[],
  paramFilters?: any[]
): boolean {
  return (
    !paramFilters?.length ||
    !reqs?.length ||
    reqs.some((r) => paramFilters.includes(r))
  );
}

export const converter: firebase.firestore.FirestoreDataConverter<ScholarshipData> =
  {
    toFirestore: (data: ScholarshipData) => {
      const user = firebase.app().auth().currentUser;
      const lastModified = new Date();
      const dateAdded = data.dateAdded ?? lastModified;
      const author =
        data.author ?? (user ? { id: user?.uid, email: user?.email } : {});
      return {
        ...data,
        author,
        amount: ScholarshipAmount.toStorage(data.amount),
        deadline: firebase.firestore.Timestamp.fromDate(data.deadline),
        dateAdded: firebase.firestore.Timestamp.fromDate(dateAdded),
        lastModified: firebase.firestore.Timestamp.fromDate(lastModified),
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
        deadline,
        dateAdded,
        lastModified,
        amount: ScholarshipAmount.fromStorage(data.amount),
      } as ScholarshipData;
    },
  };

interface FilterOptions {
  authorId?: string;
  hideExpired?: boolean;
  minAmount?: number;
  maxAmount?: number;
  grades?: GradeLevel[];
  majors?: String[];
  sortDir?: 'asc' | 'desc';
  sortField?: string;
}

const queryLimit = 1;

class Scholarships extends FirestoreCollection<ScholarshipData> {
  name = 'scholarships';
  converter = converter;

  /**
   * Lists all items in this collection.
   *
   * @param opts filter and sorting options.
   */
  list(opts: FilterOptions): Promise<FirestoreModelList<ScholarshipData>> {
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

    // Apply basic filters. Post-processing filters belong in _list().
    if (opts.authorId) {
      query = query.where('author.id', '==', opts.authorId);
    }

    // Why the sortField check? Firestore limitations. We can't apply a range filter operator (e.g. '>') unless the sorting
    // field is the same.
    // https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
    const now = new Date();
    const today = new Date(now.toDateString());

    if (opts.hideExpired && opts.sortField == 'deadline') {
      query = query.where('deadline', '>=', today);
    }

    return this._list(opts, query.limit(queryLimit));
  }

  private _list(
    opts: FilterOptions,
    query: firebase.firestore.Query<ScholarshipData>,
    lastDoc?: firebase.firestore.QueryDocumentSnapshot<ScholarshipData>
  ): Promise<FirestoreModelList<ScholarshipData>> {
    const now = new Date();
    const today = new Date(now.toDateString());
    if (lastDoc) query = query.startAfter(lastDoc);
    return query
      .get()
      .then((qSnap: firebase.firestore.QuerySnapshot<ScholarshipData>) => ({
        hasNext: qSnap.size == queryLimit,
        next:
          qSnap.size === queryLimit
            ? () => this._list(opts, query, qSnap.docs[qSnap.docs.length - 1])
            : () => Promise.resolve({} as FirestoreModelList<ScholarshipData>),
        results: qSnap.docs
          .map(
            (doc) => new FirestoreModel<ScholarshipData>(doc.ref, doc.data())
          )
          // Post-processing filters
          // These filters are applied *on* the query results.
          // This allows us work around Firestore query limitations and apply
          // complex filters.
          .filter(
            ({ data }) =>
              // Amount Filter.
              ScholarshipAmount.amountsIntersect(data.amount, {
                type: AmountType.Varies,
                min: opts.minAmount ?? 0,
                max: opts.maxAmount ?? 0,
              }) &&
              // grade filter
              requirementMatchesFilter(
                data.requirements?.grades,
                opts.grades
              ) &&
              // major filter
              requirementMatchesFilter(
                data.requirements?.majors?.map((s) => s.toLowerCase()),
                opts.majors?.map((s) => s.toLowerCase())
              ) &&
              // Deadline Filter.
              // This is needed  in case list() above couldn't apply it.
              // TODO(#692): Add a daily updated `status` field so we don't need to do this.
              (opts.sortField == 'deadline' || data.deadline >= today)
          ),
      }))
      .then(({ results, next, hasNext }) => {
        if (results.length === 0 && hasNext) return next();
        return { results, next, hasNext };
      });
  }

  new(
    data: ScholarshipData = {
      name: '',
      description: '',
      amount: {
        type: AmountType.Fixed,
        min: 0,
        max: 0,
      },
      deadline: new Date(),
      website: '',
    }
  ): FirestoreModel<ScholarshipData> {
    return new FirestoreModel<ScholarshipData>(this.collection.doc(), data);
  }
}

const scholarships = new Scholarships();

export default scholarships;
