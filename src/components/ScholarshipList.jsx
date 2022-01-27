import React, { useEffect, useState } from 'react';
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
import { DEADLINE_ASC, getDir, getField } from '../lib/sortOptions';
import { useQueryParams } from '../lib/QueryParams';

function ScholarshipList({ noResultsNode, onItemSelect }) {
  const [error, setError] = useState();

  const [params] = useQueryParams();
  const { minAmount, maxAmount, grades, majors, hideExpired } = params;
  const sortBy = params.sortBy ?? DEADLINE_ASC;
  const sortField = getField(sortBy);
  const sortDir = getDir(sortBy);

  const [scholarships, setScholarships] = useState([]);
  const [loadState, setLoadState] = useState({
    loading: false,
    canLoadMore: false,
    loadMoreFn: () =>
      Scholarships.list({
        sortField,
        sortDir,
        minAmount,
        maxAmount,
        grades,
        majors,
        hideExpired,
      }),
  });
  const { loading, canLoadMore, loadMoreFn } = loadState;
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(undefined);

  // Reset scholarships and loading state when listFn changes
  useEffect(() => {
    setScholarships([]);
    setLoadState({
      loading: true,
      canLoadMore: true,
      loadMoreFn: () =>
        Scholarships.list({
          sortField,
          sortDir,
          minAmount,
          maxAmount,
          grades,
          majors,
          hideExpired,
        }),
    });
  }, [sortField, sortDir, minAmount, maxAmount, grades, majors, hideExpired]);

  useEffect(() => console.log('ScholarshipList recreated'), []);

  useEffect(() => {
    let mounted = true;
    if (loading && canLoadMore) {
      loadMoreFn()
        .then(({ results, next, hasNext }) => {
          if (!mounted) return;
          setError(null);
          setScholarships((prev) => [...prev, ...results]);
          setLoadState({
            // Load if there were no results but there's more to load.
            loading: !results.length && hasNext,
            canLoadMore: hasNext,
            loadMoreFn: next,
          });
        })
        .catch((e) => mounted && setError(e));
    }
    return () => {
      mounted = false;
    };
  }, [loading, canLoadMore, loadMoreFn]);

  const loadMore = () => setLoadState({ ...loadState, loading: true });

  return (
    <Stack spacing={2}>
      {scholarships.map((scholarship) => (
        <ScholarshipCard
          key={scholarship.id}
          scholarship={scholarship}
          selected={scholarship.id === selectedId}
          onClick={() => {
            setSelectedId(scholarship.id);
            onItemSelect(scholarship);
          }}
          style="result"
        />
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
  listFn: PropTypes.func,
  noResultsNode: PropTypes.node,
  onItemSelect: PropTypes.func,
};
ScholarshipList.defaultProps = {
  listFn: undefined,
  noResultsNode: undefined,
  onItemSelect: () => {},
};

export default ScholarshipList;
