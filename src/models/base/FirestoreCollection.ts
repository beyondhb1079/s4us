import { firestore } from 'firebase';
import FirestoreModel from './FirestoreModel';
import Model from './Model';
import FirestoreModelList from './FiretoreModelList';

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
    baseQuery: firestore.Query<E>,
    lastDoc?: firestore.QueryDocumentSnapshot<E>
  ): Promise<FirestoreModelList<E>> {
    let query: firestore.Query<E> = baseQuery.limit(10);
    if (lastDoc) query = query.startAfter(lastDoc);

    return query.get().then((qSnap: firestore.QuerySnapshot<E>) => ({
      next: () => this.list(baseQuery, qSnap.docs[qSnap.docs.length - 1]),
      results: qSnap.docs.map(
        (doc) => new FirestoreModel<E>(doc.ref, doc.data())
      ),
      hasNext: qSnap.empty || qSnap.size < 10,
    }));
  }
}
