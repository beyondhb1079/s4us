import {
  collection,
  CollectionReference,
  doc,
  FirestoreDataConverter,
  getFirestore,
} from 'firebase/firestore';
import FirestoreModel from './FirestoreModel';
import Model from './Model';

export default abstract class FirestoreCollection<T> {
  abstract readonly name: string;
  protected abstract readonly converter: FirestoreDataConverter<T>;

  get collection(): CollectionReference<T> {
    return collection(getFirestore(), this.name).withConverter(this.converter);
  }

  new(data?: T): Model<T> {
    return new FirestoreModel<T>(doc(this.collection), data ?? ({} as T));
  }

  id(id: string, data: T = {} as T): Model<T> {
    return new FirestoreModel<T>(doc(this.collection, id), data);
  }
}
