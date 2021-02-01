import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Link as MuiLink,
  Typography,
} from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { BRAND_NAME } from '../config/constants';
import ShareDialog from './ShareDialog';

import ScholarshipListCard from './ScholarshipListCard';

const useStyles = makeStyles((theme) => ({
  actions: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  content: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
  },
  description: {
    display: '-webkit-box',
    '-webkit-line-clamp': 5,
    lineClamp: 5,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    whiteSpace: 'pre-line',
  },
}));

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
      {scholarships.map(({ id, data }) => (
        <Grid item xs={12} key={id}>
          <ScholarshipListCard scholarship={data} id={id} />
        </Grid>
      ))}
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
