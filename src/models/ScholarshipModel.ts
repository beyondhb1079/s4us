import FirestoreModel from './base/FirestoreModel';
import ScholarshipData from '../types/ScholarshipData';

export default class ScholarshipModel extends FirestoreModel<ScholarshipData> {
  save(): Promise<FirestoreModel<ScholarshipData>> {
    this.data.lastModified = new Date();
    if (!this.data.dateAdded) this.data.dateAdded = this.data.lastModified;

    return super.save();
  }
}
