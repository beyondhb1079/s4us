/**
 * @jest-environment node
 */
import FirestoreModel from './FirestoreModel';

export default interface FirestoreModelList<E> {
  hasNext: boolean;
  next: () => Promise<FirestoreModelList<E>>;
  results: FirestoreModel<E>[];
}
