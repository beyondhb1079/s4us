import {
  deleteDoc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import Model from './Model';

export default class FirestoreModel<T> implements Model<T> {
  constructor(
    private readonly ref: DocumentReference<T>,
    public readonly data: T
  ) {}

  public get id(): string {
    return this.ref.id;
  }

  get(): Promise<FirestoreModel<T>> {
    return getDoc(this.ref).then((doc: DocumentSnapshot<T>) => {
      if (!doc.exists) {
        throw new Error(`${this.ref.path} not found`);
      }
      return new FirestoreModel<T>(doc.ref, doc.data() as T);
    });
  }

  save(): Promise<FirestoreModel<T>> {
    return setDoc(this.ref, this.data).then(() => this);
  }

  delete(): Promise<void> {
    return deleteDoc(this.ref);
  }
}
