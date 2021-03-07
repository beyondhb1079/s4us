import { firestore } from 'firebase';
import FirestoreModel from './FirestoreModel';
import Model from './Model';

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

  /** Returns a wrapped query promise that converts the data. */
  protected static list<E>(
    query: firestore.Query<E>
  ): Promise<FirestoreModel<E>[]> {
    return query
      .get()
      .then((querySnapshot: firestore.QuerySnapshot<E>) =>
        querySnapshot.docs.map(
          (doc) => new FirestoreModel<E>(doc.ref, doc.data())
        )
      );
  }
}
