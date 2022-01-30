import React, { createContext, useEffect, useContext, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Scholarships from '../models/Scholarships';

import ScholarshipCard from './ScholarshipCard';

const ResultsContext = createContext(null);

export const ResultsProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const [filtersJSON, setFiltersJSON] = useState(null);
  // Might be better to use load state.
  const [loading, setLoading] = useState(false);
  const [loadMoreFn, setLoadMoreFn] = useState(null);

  useEffect(() => {
    if (filtersJSON) {
      console.log('filter options changed', filtersJSON);
      setScholarships([]);
      setLoadMoreFn(
        () => () => Scholarships.list({ ...JSON.parse(filtersJSON) })
      );
      setLoading(true);
    }
  }, [filtersJSON]);

  useEffect(() => {
    if (loading && loadMoreFn) {
      // console.log('in effect load function:', loadMoreFn);
      loadMoreFn()
        .then(({ results, next, hasNext }) => {
          console.log('results received: ', results);
          setError(null);
          setScholarships((prev) => [...prev, ...results]);
          // Keep loading if there are no results but there's more to load.
          setLoading(!results.length && hasNext);
          setLoadMoreFn(hasNext ? () => next : undefined);
        })
        .catch(setError);
    }
  }, [loading, loadMoreFn]);
  // console.log('canLoadMore', Boolean(loadMoreFn), 'loadMoreFn', loadMoreFn);

  return (
    <ResultsContext.Provider
      value={{
        canLoadMore: Boolean(loadMoreFn),
        error,
        loading,
        loadMore: () => setLoading(true),
        scholarships,
        setFilters: (filterOptions) =>
          setFiltersJSON(JSON.stringify(filterOptions)),
      }}>
      {children}
    </ResultsContext.Provider>
  );
};

export default function ScholarshipList({
  noResultsNode,
  filterOptions: filters,
}) {
  const { t } = useTranslation();
  const { canLoadMore, error, loading, loadMore, scholarships, setFilters } =
    useContext(ResultsContext);

  // Resets result context if listFn changes.
  useEffect(() => setFilters(filters), [filters, setFilters]);

  return (
    <Stack spacing={3}>
      {scholarships.map(({ id, data }) => (
        <ScholarshipCard key={id} scholarship={{ id, data }} style="result" />
      ))}
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        {(() => {
          if (error) return <Typography>{error.toString()}</Typography>;
          if (loading)
            return (
              <CircularProgress
                data-testid="progress"
                sx={{ display: 'block', margin: 'auto' }}
              />
            );
          if (canLoadMore)
            return (
              <Button color="primary" onClick={loadMore}>
                {t('btn.loadMore')}
              </Button>
            );
          if (scholarships?.length)
            return (
              <Typography>{t('listScholarships.endOfResults')}</Typography>
            );
          return (
            noResultsNode || (
              <Typography>
                {t('listScholarships.noScholarshipsFound')}
              </Typography>
            )
          );
        })()}
      </Box>
    </Stack>
  );
}

ScholarshipList.propTypes = {
  filters: PropTypes.object,
  noResultsNode: PropTypes.node,
};
ScholarshipList.defaultProps = {
  filters: {},
  noResultsNode: undefined,
};
