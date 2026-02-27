import { Timestamp } from 'firebase/firestore';
import ScholarshipData from './ScholarshipData';

export default interface PendingApprovalItem extends ScholarshipData {
  sourceUrl: string;
  scrapedAt: Date | Timestamp;
}
