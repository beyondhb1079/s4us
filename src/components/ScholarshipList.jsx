import React, { useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
  loadMore: {
    margin: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  progress: {
    display: 'block',
    margin: 'auto',
  },
}));

function ScholarshipList({ loading, onLoadMore, scholarships }) {
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

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {scholarships.map(({ id, data }) => (
            <ScholarshipListCard scholarship={{ id, data }} key={id} />
          ))}
        </Grid>
        <ShareDialog
          open={shareDialogOpen}
          onClose={closeShareDialog}
          link={shareSiteLink}
          title={shareSiteTitle}
        />
      </Grid>
      {loading ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <Box className={classes.loadMore}>
          {onLoadMore ? (
            <Button color="primary" onClick={onLoadMore}>
              Load More
            </Button>
          ) : (
            <Typography>End of results</Typography>
          )}
        </Box>
      )}
    </>
  );
}

ScholarshipList.propTypes = {
  scholarships: PropTypes.arrayOf(PropTypes.object),
  // Function to load more or leave null if there is no more to load
  onLoadMore: PropTypes.func,
  loading: PropTypes.bool,
};
ScholarshipList.defaultProps = {
  scholarships: [],
  onLoadMore: undefined,
  loading: false,
};

export default ScholarshipList;
