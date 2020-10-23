import { firestore } from 'firebase';
import FirestoreModel from './FirestoreModel';
import Model from './Model';

type SortDirection = 'asc' | 'desc' | undefined;

export default abstract class FirestoreCollection<T> {
  abstract readonly name: string;
  protected abstract readonly converter: firestore.FirestoreDataConverter<T>;

  get collection(): firestore.CollectionReference<T> {
    return firestore().collection(this.name).withConverter(this.converter);
  }

  new(data?: T): Model<T> {
    return new FirestoreModel<T>(this.collection.doc(), data ?? ({} as T));
  }

  id(id: string): Model<T> {
    return new FirestoreModel<T>(this.collection.doc(id), {} as T);
  }

  // TODO(issues/93): Support filters and pagination
  /**
   * opts.sortDir is 'asc' by default
   */
  list(opts?: {
    sortField?: string;
    sortDir?: SortDirection;
  }): Promise<FirestoreModel<T>[]> {
    return new Promise((resolve, reject) => {
      const query = opts?.sortField
        ? this.collection.orderBy(opts.sortField, opts.sortDir)
        : this.collection;
      query
        .get()
        .then((querySnapshot: firestore.QuerySnapshot<T>) => {
          resolve(
            querySnapshot.docs.map(
              (doc) => new FirestoreModel<T>(doc.ref, doc.data())
            )
          );
        })
        .catch((error) => reject(error));
    });
  }
}
