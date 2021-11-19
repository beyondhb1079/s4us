import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import ScholarshipListCard from './ScholarshipListCard';

function ScholarshipList({ noResultsNode, listFn }) {
  const [error, setError] = useState();
  const [scholarships, setScholarships] = useState([]);
  const [loadState, setLoadState] = useState({
    loading: true,
    canLoadMore: true,
    loadMoreFn: listFn,
  });
  const { loading, canLoadMore, loadMoreFn } = loadState;

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
    <Grid container spacing={3}>
      {scholarships.map(({ id, data }) => (
        <Grid item xs={12} key={id}>
          <ScholarshipListCard scholarship={{ id, data }} />
        </Grid>
      ))}
      <Grid item xs={12}>
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
                  Load More
                </Button>
              );
            if (scholarships?.length)
              return <Typography>End of results</Typography>;
            return noResultsNode;
          })()}
        </Box>
      </Grid>
    </Grid>
  );
}

ScholarshipList.propTypes = {
  listFn: PropTypes.func,
  noResultsNode: PropTypes.node,
};
ScholarshipList.defaultProps = {
  listFn: undefined,
  noResultsNode: <Typography>No scholarships found</Typography>,
};

export default ScholarshipList;
