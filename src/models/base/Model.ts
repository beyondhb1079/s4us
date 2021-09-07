export default interface Model<T> {
  id: string;
  data: T;

  get(): Promise<Model<T>>;
  save(): Promise<Model<T>>;
  delete(): Promise<void>;
}
