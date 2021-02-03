import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { BRAND_NAME } from '../config/constants';
import ShareDialog from './ShareDialog';

import ScholarshipListCard from './ScholarshipListCard';

// move out from component
// because it don't need to recreate every time component render
const shareFn = (
  id,
  data,
  setShareSiteLink,
  setShareSiteTitle,
  setShareDialogOpen
) => () => {
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

function ScholarshipList({ scholarships }) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const closeShareDialog = () => setShareDialogOpen(false);

  const [shareSiteLink, setShareSiteLink] = React.useState('');
  const [shareSiteTitle, setShareSiteTitle] = React.useState('');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {scholarships.map(({ id, data }) => (
          <ScholarshipListCard scholarship={data} id={id} key={id} />
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
};
ScholarshipList.defaultProps = {
  scholarships: [],
};

export default ScholarshipList;
