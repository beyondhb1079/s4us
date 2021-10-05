import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';

import ScholarshipListCard from './ScholarshipListCard';

const useStyles = makeStyles(() => ({
  centered: {
    margin: 'auto',
    textAlign: 'center',
  },
  progress: {
    display: 'block',
    margin: 'auto',
  },
}));

function ScholarshipList({ noResultsNode, listFn }) {
  const classes = useStyles();

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
            loading: false,
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
        <Box className={classes.centered}>
          {(() => {
            if (error) return <Typography>{error.toString()}</Typography>;
            if (loading)
              return (
                <CircularProgress
                  data-testid="progress"
                  className={classes.progress}
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
