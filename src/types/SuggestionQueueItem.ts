import { Timestamp } from 'firebase/firestore';

export type SuggestionStatus = 'PENDING' | 'PROCESSING' | 'FAILED' | 'REJECTED';

export default interface SuggestionQueueItem {
  url: string;
  submittedAt: Date | Timestamp;
  status: SuggestionStatus;
  priorityScore: number;
}
