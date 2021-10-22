import FirestoreModel from './base/FirestoreModel';
import ScholarshipData from '../types/ScholarshipData';
import ScholarshipAmount from '../types/ScholarshipAmount';

export default class ScholarshipModel extends FirestoreModel<ScholarshipData> {
  save(): Promise<FirestoreModel<ScholarshipData>> {
    ScholarshipAmount.validate(this.data.amount);
    this.data.lastModified = new Date();
    if (!this.data.dateAdded) this.data.dateAdded = this.data.lastModified;

    return super.save();
  }
}
