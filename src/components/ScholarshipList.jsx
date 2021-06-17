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
import { BRAND_NAME } from '../config/constants';
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

function ScholarshipList({ noResultsNode, listFn }) {
  const classes = useStyles();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const closeShareDialog = () => setShareDialogOpen(false);

  const [shareSiteLink, setShareSiteLink] = React.useState('');
  const [shareSiteTitle, setShareSiteTitle] = React.useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const shareFn = (id, data) => () => {
    const title = `${data.amount} - ${data.name} | ${BRAND_NAME}`;
    const url = `https://${window.location.hostname}/scholarships/${id}`;
    const text =
      `${data.amount} - ${data.name} | ${BRAND_NAME}\n` +
      `${data.deadline.toLocaleDateString()}\n`;
    if (navigator.share) {
      navigator
        .share({ title, url, text })
        // eslint-disable-next-line no-console
        .then(() => console.log('Thanks for sharing!'))
        // eslint-disable-next-line no-console
        .catch(console.error);
    } else {
      setShareSiteLink(url);
      setShareSiteTitle(title);
      setShareDialogOpen(true);
    }
  };

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
      <Grid item xs={12}>
        {scholarships.map(({ id, data }) => (
          <ScholarshipListCard scholarship={{ id, data }} key={id} />
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
  noResultsNode: PropTypes.node,
};
ScholarshipList.defaultProps = {
  listFn: undefined,
  noResultsNode: <Typography>No scholarships found</Typography>,
};

export default ScholarshipList;
