// import firebase from 'firebase/app';
import FirestoreModel from './FirestoreModel';

export default class ScholarshipModel<
  T extends { lastModified?: Date; dateAdded?: Date }
> extends FirestoreModel<T> {
  save(): Promise<FirestoreModel<T>> {
    this.data.lastModified = new Date();
    if (!this.data.dateAdded) this.data.dateAdded = this.data.lastModified;

    return super.save();
  }
}
