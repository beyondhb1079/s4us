import FirestoreModel from './FirestoreModel';

export default interface FirestoreModelList<E> {
  next: () => Promise<FirestoreModelList<E>>;
  results: FirestoreModel<E>[];
  hasNext: boolean;
}
