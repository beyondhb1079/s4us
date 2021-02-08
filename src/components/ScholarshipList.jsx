import React, { useState } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import ShareDialog from './ShareDialog';

import ScholarshipListCard from './ScholarshipListCard';

const useStyles = makeStyles(() => ({
  noScholarships: {
    margin: 'auto',
  },
}));

function ScholarshipList({ scholarships, selectedIndex, setSelectedIndex }) {
  const classes = useStyles();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const closeShareDialog = () => setShareDialogOpen(false);

  const [shareSiteLink] = useState('');
  const [shareSiteTitle] = useState('');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {scholarships.length === 0 && (
          <Typography variant="h5" className={classes.noScholarships}>
            No scholarships found
          </Typography>
        )}
        {scholarships.map(({ id, data }, index) => (
          <ScholarshipListCard
            scholarship={{ id, data }}
            key={id}
            selected={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
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
  scholarships: PropTypes.arrayOf(PropTypes.object),
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func,
};
ScholarshipList.defaultProps = {
  scholarships: [],
  selectedIndex: undefined,
  setSelectedIndex: () => {},
};

export default ScholarshipList;
