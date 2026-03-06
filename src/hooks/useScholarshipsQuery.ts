import { useInfiniteQuery } from '@tanstack/react-query';
import Scholarships, { FilterOptions } from '../models/Scholarships';
import FirestoreModelList from '../models/base/FirestoreModelList';
import ScholarshipData from '../types/ScholarshipData';

export function useScholarshipsQuery(filters: FilterOptions) {
  return useInfiniteQuery<FirestoreModelList<ScholarshipData>, Error>({
    queryKey: ['scholarships', filters],
    queryFn: async ({ pageParam }) => {
      if (!pageParam) {
        return await Scholarships.list(filters);
      }
      return await (pageParam as FirestoreModelList<ScholarshipData>).next();
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        return lastPage;
      }
      return undefined;
    },
  });
}
