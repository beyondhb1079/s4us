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
import ShareDialog from './ShareDialog';

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

function ScholarshipList({
  listFn,
  reload,
  noResultsNode,
  selectedId,
  onItemSelect,
}) {
  const classes = useStyles();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const closeShareDialog = () => setShareDialogOpen(false);

  const [shareSiteLink] = useState('');
  const [shareSiteTitle] = useState('');

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
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {scholarships.map((scholarship) => (
          <ScholarshipListCard
            scholarship={scholarship}
            key={scholarship.id}
            selected={scholarship.id === selectedId}
            onClick={() => onItemSelect(scholarship)}
          />
        ))}
        <Box className={classes.centered}>
          {(() => {
            if (error) return <Typography>error.toString()</Typography>;
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
      <ShareDialog
        open={shareDialogOpen}
        onClose={closeShareDialog}
        link={shareSiteLink}
        title={shareSiteTitle}
      />
    </Grid>
  );
}

ScholarshipList.propTypes = {
  listFn: PropTypes.func,
  reload: PropTypes.bool,
  noResultsNode: PropTypes.node,
  selectedId: PropTypes.number,
  onItemSelect: PropTypes.func,
};

ScholarshipList.defaultProps = {
  listFn: undefined,
  reload: false,
  noResultsNode: <Typography>No scholarships found</Typography>,
  selectedId: undefined,
  onItemSelect: () => {},
};

export default ScholarshipList;
