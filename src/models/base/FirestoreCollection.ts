import firebase from 'firebase/app';
import FirestoreModel from './FirestoreModel';
import Model from './Model';
import FirestoreModelList from './FiretoreModelList';

export default abstract class FirestoreCollection<T> {
  abstract readonly name: string;
  protected abstract readonly converter: firebase.firestore.FirestoreDataConverter<T>;

  get collection(): firebase.firestore.CollectionReference<T> {
    return firebase
      .firestore()
      .collection(this.name)
      .withConverter(this.converter);
  }

  new(data?: T): Model<T> {
    return new FirestoreModel<T>(this.collection.doc(), data ?? ({} as T));
  }

  id(id: string): Model<T> {
    return new FirestoreModel<T>(this.collection.doc(id), {} as T);
  }

  /** Returns a wrapped query promise that converts the data. */
  protected static list<E>(
    baseQuery: firebase.firestore.Query<E>,
    postProcessFilter: (results: FirestoreModel<E>) => boolean = () => true,
    lastDoc?: firebase.firestore.QueryDocumentSnapshot<E>
  ): Promise<FirestoreModelList<E>> {
    const limit = 10;
    let query: firebase.firestore.Query<E> = baseQuery.limit(limit);
    if (lastDoc) query = query.startAfter(lastDoc);

    return query.get().then((qSnap: firebase.firestore.QuerySnapshot<E>) => ({
      next: () =>
        this.list(
          baseQuery,
          postProcessFilter,
          qSnap.docs[qSnap.docs.length - 1]
        ),
      results: qSnap.docs
        .map((doc) => new FirestoreModel<E>(doc.ref, doc.data()))
        .filter(postProcessFilter),
      hasNext: qSnap.size == limit,
    }));
  }
}
