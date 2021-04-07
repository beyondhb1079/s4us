import FirestoreModel from '../models/base/FirestoreModel';

export default interface ScholarshipCollectionList<E> {
  next: () => Promise<ScholarshipCollectionList<E>>;
  results: FirestoreModel<E>[];
}
