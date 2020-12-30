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

function ScholarshipList({ scholarships }) {
  const classes = useStyles();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const showShareDialog = () => setShareDialogOpen(true);
  const handleClose = () => setShareDialogOpen(false);
  const shareFn = (id, data) => () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${data.amount} - ${data.name}`,
          url: `${window.location.hostname}/scholarships/${id}`,
          text:
            `${data.amount} - ${data.name}\n` +
            `${data.deadline.toLocaleDateString()}\n` +
            `Shared via ${BRAND_NAME} (under construction)`,
        })
        .then(() => console.log('Thanks for sharing!'))
        .catch(console.error);
    } else {
      // TODO(https://github.com/beyondhb1079/s4us/issues/154): Share dialog for Web
      alert('This feature is under construction');
    }
  };
  return (
    <Grid container spacing={3}>
      {scholarships.map(({ id, data }) => (
        <Grid item xs={12} key={id}>
          <Card variant="outlined">
            <CardActionArea component={Link} to={`/scholarships/${id}`}>
              <CardHeader
                title={data.name}
                subheader={data.amount.toString()}
              />
              <CardContent className={classes.content}>
                <Typography gutterBottom variant="body1">
                  Deadline:{' '}
                  <Typography component="span" color="primary">
                    {data.deadline.toLocaleDateString()}
                  </Typography>
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={classes.description}>
                  {data.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
              <Button
                component={MuiLink}
                href={data.website}
                color="primary"
                variant="contained">
                Apply
              </Button>
              <IconButton
                aria-label="add to bookmarks"
                color="primary"
                onClick={() => alert('This feature is under construction')}>
                <BookmarkBorderIcon />
              </IconButton>
              <ShareDialog
                open={shareDialogOpen}
                onClose={handleClose}
                urlLink={`https://dreamerscholars.web.app/scholarships/${id}`}
                scholarshipName={data.name}
              />
              <IconButton
                aria-label="share"
                color="primary"
                onClick={shareFn(id, data) && showShareDialog}>
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
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
