import {
  FirestoreDataConverter,
  getDocs,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore/lite';
import FirestoreCollection from './base/FirestoreCollection';
import ScholarshipData from '../types/ScholarshipData';
import { ScholarshipAmountInfo } from '../types/ScholarshipAmount';
import FirestoreModelList from './base/FiretoreModelList';
import FirestoreModel from './base/FirestoreModel';

export interface PendingApprovalData extends ScholarshipData {
  sourceUrl: string;
  scrapedAt: Date;
}

export const converter: FirestoreDataConverter<PendingApprovalData> = {
  toFirestore: (data: PendingApprovalData) => {
    return {
      ...data,
      amount: ScholarshipAmountInfo.toStorage(data.amount),
      deadline: Timestamp.fromDate(data.deadline),
      scrapedAt: Timestamp.fromDate(data.scrapedAt),
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const data = snapshot.data();
    return {
      ...data,
      deadline: (data.deadline as Timestamp).toDate(),
      scrapedAt: (data.scrapedAt as Timestamp).toDate(),
      amount: ScholarshipAmountInfo.fromStorage(data.amount),
    } as PendingApprovalData;
  },
};

class PendingApprovals extends FirestoreCollection<PendingApprovalData> {
  name = 'pending_approval';
  converter = converter;

  async list(): Promise<FirestoreModelList<PendingApprovalData>> {
    const qSnap = await getDocs(this.collection);
    const results = qSnap.docs.map(
      (d) => new FirestoreModel<PendingApprovalData>(d.ref, d.data()),
    );
    return {
      results,
      hasNext: false,
      next: () =>
        Promise.resolve({} as FirestoreModelList<PendingApprovalData>),
    };
  }
}

const pendingApprovals = new PendingApprovals();
export default pendingApprovals;
