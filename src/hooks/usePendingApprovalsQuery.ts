import { useQuery } from '@tanstack/react-query';
import PendingApprovals, {
  PendingApprovalData,
} from '../models/PendingApprovals';
import FirestoreModel from '../models/base/FirestoreModel';

export function usePendingApprovalsQuery() {
  return useQuery<FirestoreModel<PendingApprovalData>[], Error>({
    queryKey: ['pending_approvals'],
    queryFn: async () => {
      const list = await PendingApprovals.list();
      return list.results;
    },
  });
}
