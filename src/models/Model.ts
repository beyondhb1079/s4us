export default interface Model<T> {
  id?: string;
  data: T;

  get(): Promise<Model<T>>;
  save(): Promise<Model<T>>;
  delete(): Promise<void>;

  /**
   * Adds an observer for changes to the underlying data.
   *
   * @returns an unsubscribe function to unregister the observer.
   */
  subscribe(onChange: (model: Model<T>) => void, onError?: (err:Error) => void): () => void;
}
