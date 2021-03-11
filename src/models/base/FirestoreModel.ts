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
    return this.ref.get().then((doc: firestore.DocumentSnapshot<T>) => {
      if (!doc.exists) {
        throw new Error(`${this.ref.path} not found`);
      }
      return new FirestoreModel<T>(doc.ref, doc.data() as T);
    });
  }

  save(): Promise<FirestoreModel<T>> {
    return this.ref.set(this.data).then(() => this);
  }

  delete(): Promise<void> {
    return this.ref.delete();
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
