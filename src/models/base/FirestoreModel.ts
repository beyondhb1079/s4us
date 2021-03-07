import { firestore } from 'firebase';
import Model from './Model';

export default class FirestoreModel<T> implements Model<T> {
  constructor(
    private readonly ref: firestore.DocumentReference<T>,
    public readonly data: T
  ) {}

  public get id(): string {
    return this.ref.id;
  }

  get(): Promise<FirestoreModel<T>> {
    return new Promise((resolve, reject) => {
      this.ref
        .get()
        .then((doc: firestore.DocumentSnapshot<T>) => {
          if (!doc.exists) {
            reject(new Error(`${this.ref.path} not found`));
            return;
          }
          resolve(new FirestoreModel<T>(doc.ref, doc.data() as T));
        })
        .catch((error) => reject(error));
    });
  }

  save(): Promise<FirestoreModel<T>> {
    return new Promise((resolve, reject) => {
      this.ref
        .set(this.data)
        .then(() => resolve(this))
        .catch((error) => reject(error));
    });
  }

  delete(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ref
        .delete()
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  subscribe(
    onChange: (model: Model<T>) => void,
    onError = console.error // eslint-disable-line no-console
  ): () => void {
    return this.ref.onSnapshot((doc: firestore.DocumentSnapshot<T>) => {
      if (!doc.exists) {
        onError(new Error(`${this.ref.path} not found`));
        return;
      }
      onChange(new FirestoreModel<T>(doc.ref, doc.data() as T));
    }, onError);
  }
}
