import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import ScholarshipListCard from './ScholarshipListCard';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  centered: {
    margin: 'auto',
    textAlign: 'center',
  },
  progress: {
    display: 'block',
    margin: 'auto',
  },
}));

function ScholarshipList({ listFn, noResultsNode, selectedId, onItemSelect }) {
  const classes = useStyles();

  const [error, setError] = useState();
  const [scholarships, setScholarships] = useState([]);
  const [loadState, setLoadState] = useState({
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
    <Grid container spacing={2} className={classes.root}>
      {scholarships.map((scholarship) => (
        <Grid item xs={12} key={scholarship.id}>
          <ScholarshipListCard
            scholarship={scholarship}
            selected={scholarship.id === selectedId}
            onClick={() => onItemSelect(scholarship)}
          />
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
  selectedId: PropTypes.number,
  onItemSelect: PropTypes.func,
};

ScholarshipList.defaultProps = {
  listFn: undefined,
  noResultsNode: <Typography>No scholarships found</Typography>,
  selectedId: undefined,
  onItemSelect: () => {},
};

export default ScholarshipList;
