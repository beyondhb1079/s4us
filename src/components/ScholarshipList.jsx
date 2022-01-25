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

import ScholarshipCard from './ScholarshipCard';

function ScholarshipList({ noResultsNode, listFn, selectedId, onItemSelect }) {
  const [error, setError] = useState();
  const [scholarships, setScholarships] = useState([]);
  const [loadState, setLoadState] = useState({
    loading: true,
    canLoadMore: true,
    loadMoreFn: listFn,
  });
  const { loading, canLoadMore, loadMoreFn } = loadState;
  const { t } = useTranslation();

  // Reset scholarships and loading state when listFn changes
  useEffect(() => {
    setScholarships([]);
    setLoadState({
      loading: true,
      canLoadMore: true,
      loadMoreFn: listFn,
    });
  }, [listFn]);

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
          scholarship={scholarship}
          selected={scholarship.id === selectedId}
          onClick={() => onItemSelect(scholarship)}
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
  selectedId: PropTypes.number,
  onItemSelect: PropTypes.func,
};
ScholarshipList.defaultProps = {
  listFn: undefined,
  noResultsNode: undefined,
  selectedId: undefined,
  onItemSelect: () => {},
};

export default ScholarshipList;
