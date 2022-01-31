import React, { createContext, ReactNode, useEffect, useState } from 'react';
import FirestoreModel from './base/FirestoreModel';
import FirestoreModelList from './base/FiretoreModelList';
import Scholarships, { FilterOptions } from './Scholarships';
import ScholarshipData from '../types/ScholarshipData';

interface ScholarshipsContextState {
  scholarships: FirestoreModel<ScholarshipData>[];
  error: Error | null;
  canLoadMore: boolean;
  loading: boolean;
  loadMore: () => void;
  setFilters: (filterOptions: FilterOptions) => void;
}

const ScholarshipsContext = createContext({} as ScholarshipsContextState);

interface Props {
  children: ReactNode;
}

export function ScholarshipsProvider({ children }: Props): ReactNode {
  const [error, setError] = useState(null as Error | null);
  const [scholarships, setScholarships] = useState(
    [] as FirestoreModel<ScholarshipData>[]
  );
  const [filtersJSON, setFiltersJSON] = useState('');
  const [{ loading, loadMoreFn }, setLoadState] = useState({
    loading: false,
    loadMoreFn: undefined as
      | undefined
      | (() => Promise<FirestoreModelList<ScholarshipData>>),
  });

  // Reset context and fetch scholarships if filters change.
  useEffect(() => {
    if (filtersJSON.length) {
      setScholarships([]);
      setLoadState({
        loading: true,
        loadMoreFn: () => Scholarships.list({ ...JSON.parse(filtersJSON) }),
      });
    }
  }, [filtersJSON]);

  // Load additional scholarships if requested.
  useEffect(() => {
    if (loading && loadMoreFn) {
      loadMoreFn()
        .then(({ results, next, hasNext }) => {
          setError(null);
          setScholarships((prev) => [...prev, ...results]);
          setLoadState({
            // Keep loading if no results but there's more to load.
            // Though I think Scholarships._list already takes care of this.
            loading: !results.length && hasNext,
            loadMoreFn: hasNext ? next : undefined,
          });
        })
        .catch(setError);
    }
  }, [loading, loadMoreFn]);

  return (
    <ScholarshipsContext.Provider
      value={{
        canLoadMore: Boolean(loadMoreFn),
        error,
        loading,
        loadMore: () => setLoadState({ loading: true, loadMoreFn }),
        scholarships,
        setFilters: (filterOptions) =>
          setFiltersJSON(JSON.stringify(filterOptions)),
      }}>
      {children}
    </ScholarshipsContext.Provider>
  );
}

export default ScholarshipsContext;
