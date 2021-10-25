import firebase from 'firebase/app';
import Model from './Model';

export default class FirestoreModel<T> implements Model<T> {
  constructor(
    private readonly ref: firebase.firestore.DocumentReference<T>,
    public readonly data: T
  ) {}

  public get id(): string {
    return this.ref.id;
  }

  get(): Promise<FirestoreModel<T>> {
    return this.ref
      .get()
      .then((doc: firebase.firestore.DocumentSnapshot<T>) => {
        if (!doc.exists) {
          throw new Error(`${this.ref.path} not found`);
        }
        return new FirestoreModel<T>(doc.ref, doc.data() as T);
      });
  }

  save(): Promise<FirestoreModel<T>> {
    // if (this.data.author) return this.ref.update(this.data).then(() => this);
    return this.ref.set(this.data).then(() => this);
  }

  delete(): Promise<void> {
    return this.ref.delete();
  }
}
