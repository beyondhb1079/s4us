import { ScholarshipAmountInfo } from '../types/ScholarshipAmount';
import FirestoreCollection from './base/FirestoreCollection';
import FirestoreModelList from './base/FiretoreModelList';
import FirestoreModel from './base/FirestoreModel';
import ScholarshipData from '../types/ScholarshipData';
import AmountType from '../types/AmountType';
import GradeLevel from '../types/GradeLevel';
import { getAuth, User } from 'firebase/auth';
import {
  doc,
  FirestoreDataConverter,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  SnapshotOptions,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import Ethnicity from '../types/Ethnicity';

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
  reqs?: (string | number)[],
  paramFilters?: (string | number)[],
): boolean {
  return (
    !paramFilters?.length ||
    !reqs?.length ||
    reqs.some((r) => paramFilters.includes(r))
  );
}

let fakeUser: User | null = null;

function getUser(): User | null {
  return fakeUser ?? getAuth().currentUser;
}

export function setFakeUser(user: User | null): void {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'test') {
    throw Error('this method is only for tests.');
  }
  fakeUser = user;
}

export const converter: FirestoreDataConverter<ScholarshipData> = {
  toFirestore: (data: ScholarshipData) => {
    const user = getUser();
    const lastModified = new Date();
    const dateAdded = data.dateAdded ?? lastModified;
    const author =
      data.author ?? (user ? { id: user?.uid, email: user?.email } : {});
    return {
      ...data,
      author,
      amount: ScholarshipAmountInfo.toStorage(data.amount),
      deadline: Timestamp.fromDate(data.deadline),
      dateAdded: Timestamp.fromDate(dateAdded),
      lastModified: Timestamp.fromDate(lastModified),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    const deadline = (data.deadline as Timestamp).toDate();
    const dateAdded = (data.dateAdded as Timestamp)?.toDate();
    const lastModified = (data.lastModified as Timestamp)?.toDate();

    return {
      ...data,
      deadline,
      dateAdded,
      lastModified,
      amount: ScholarshipAmountInfo.fromStorage(data.amount),
    } as ScholarshipData;
  },
};

export interface FilterOptions {
  authorId?: string;
  showExpired?: boolean;
  minAmount?: number;
  maxAmount?: number;
  grades?: GradeLevel[];
  majors?: string[];
  states?: string[];
  schools?: string[];
  ethnicities?: Ethnicity[];
  sortDir?: 'asc' | 'desc';
  sortField?: string;
  // The number of scholarships to load at a time. Defaults to 10.
  limit?: number;
  // A case-sensitive prefix to use to filter
  namePrefix?: string;
}

const defaultLimit = 10;

class Scholarships extends FirestoreCollection<ScholarshipData> {
  name = 'scholarships';
  converter = converter;

  /**
   * Lists all items in this collection.
   *
   * @param opts filter and sorting options.
   */
  list(opts: FilterOptions): Promise<FirestoreModelList<ScholarshipData>> {
    let q: Query<ScholarshipData> = this.collection;

    // Set default sorting field and direction if they're not set
    if (!opts.sortField) opts.sortField = 'deadline';
    if (!opts.sortDir) opts.sortDir = 'asc';

    // Sort by requested field + direction
    q = query(q, orderBy(opts.sortField, opts.sortDir));

    // Sort ties by earliest deadline first
    if (opts.sortField !== 'deadline') {
      q = query(q, orderBy('deadline', 'asc'));
    }

    // Apply basic filters. Post-processing filters belong in _list().
    if (opts.authorId) {
      q = query(q, where('author.id', '==', opts.authorId));
    }

    // Applies a filter that looks for scholarships with names starting with
    // the given prefix.
    // https://stackoverflow.com/a/56815787/4811506
    if (opts.namePrefix) {
      console.log('namePrefix', opts.namePrefix);
      q = query(
        q,
        where('name', '>=', opts.namePrefix),
        where('name', '<=', opts.namePrefix + '\uf8ff')
      );
    }

    // Why the sortField check? Firestore limitations. We can't apply a range filter operator (e.g. '>') unless the sorting
    // field is the same.
    // https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
    const now = new Date();
    const today = new Date(now.toDateString());

    if (!opts.showExpired && opts.sortField == 'deadline') {
      q = query(q, where('deadline', '>=', today));
    }

    return this._list(opts, query(q, limit(opts.limit || defaultLimit)));
  }

  private _list(
    opts: FilterOptions,
    q: Query<ScholarshipData>,
    lastDoc?: QueryDocumentSnapshot<ScholarshipData>,
  ): Promise<FirestoreModelList<ScholarshipData>> {
    const now = new Date();
    const today = new Date(now.toDateString());
    if (lastDoc) q = query(q, startAfter(lastDoc));
    return getDocs(q)
      .then((qSnap: QuerySnapshot<ScholarshipData>) => ({
        hasNext: qSnap.size == opts.limit,
        next:
          qSnap.size === opts.limit
            ? () => this._list(opts, q, qSnap.docs[qSnap.docs.length - 1])
            : () => Promise.resolve({} as FirestoreModelList<ScholarshipData>),
        results: qSnap.docs
          .map((d) => new FirestoreModel<ScholarshipData>(d.ref, d.data()))
          // Post-processing filters
          // These filters are applied *on* the query results.
          // This allows us work around Firestore query limitations and apply
          // complex filters.
          .filter(
            ({ data }) =>
              // Amount Filter.
              ScholarshipAmountInfo.amountsIntersect(data.amount, {
                type: AmountType.Varies,
                min: opts.minAmount ?? 0,
                max: opts.maxAmount ?? 0,
              }) &&
              // grade filter
              requirementMatchesFilter(
                data.requirements?.grades,
                opts.grades,
              ) &&
              // major filter
              requirementMatchesFilter(
                data.requirements?.majors?.map((s) => s.toLowerCase()),
                opts.majors?.map((s) => s.toLowerCase()),
              ) &&
              // state filter
              requirementMatchesFilter(
                data.requirements?.states,
                opts.states,
              ) &&
              // school filter
              requirementMatchesFilter(
                data.requirements?.schools?.map((s) => s.toLowerCase()),
                opts.schools?.map((s) => s.toLowerCase()),
              ) &&
              // ethnicities filter
              requirementMatchesFilter(
                data.requirements?.ethnicities,
                opts.ethnicities,
              ) &&
              // Deadline Filter.
              // This is needed  in case list() above couldn't apply it.
              // TODO(#692): Add a daily updated `status` field so we don't need to do this.
              (opts.sortField == 'deadline' || data.deadline >= today),
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
    },
  ): FirestoreModel<ScholarshipData> {
    return new FirestoreModel<ScholarshipData>(doc(this.collection), data);
  }
}

const scholarships = new Scholarships();

export default scholarships;
