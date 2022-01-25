import firebase from 'firebase/app';
import FirestoreModel from './FirestoreModel';
import Model from './Model';

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
}
