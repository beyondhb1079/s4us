import React, { createContext, ReactNode, useEffect, useState } from 'react';
import FirestoreModelList from './base/FiretoreModelList';
import Model from './base/Model';
import Scholarships, { FilterOptions } from './Scholarships';
import ScholarshipData from '../types/ScholarshipData';

interface ScholarshipsCacheState {
  scholarships: Model<ScholarshipData>[];
  error: Error | null;
  canLoadMore: boolean;
  /**
   * Tries to update (or remove is `newData` is not set) the scholarship
   * specified by `id` in the context.
   *
   * If the scholarship is not found or `id` is undefined,
   * the whole context state is invalidated.
   * */
  invalidate: (id?: string, newData?: ScholarshipData) => void;
  loading: boolean;
  loadMore: () => void;
  setFilters: (filterOptions: FilterOptions) => void;
}

const ScholarshipsContext = createContext({} as ScholarshipsCacheState);

interface Props {
  children: ReactNode;
}

export function ScholarshipsProvider({ children }: Props): JSX.Element {
  const [error, setError] = useState(null as Error | null);
  const [scholarships, setScholarships] = useState(
    [] as Model<ScholarshipData>[],
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
        invalidate: (id, data) => {
          if (id && scholarships.map((s) => s.id).includes(id)) {
            if (data) {
              // Just update the data. This updated data might no longer match
              // the original query but that's probably OK as new queries will
              // clear the cache anyway.
              setScholarships(
                scholarships.map((s) =>
                  s.id === id ? Scholarships.id(id, data) : s,
                ),
              );
            } else {
              // Just remove the scholarship from the list.
              setScholarships(scholarships.filter((s) => s.id !== id));
            }
          } else {
            // We need to invalidate the whole cache.
            setFiltersJSON('');
            setScholarships([]);
          }
        },
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
