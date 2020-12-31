import React from 'react';
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
  const shareFn = (id, data) => () => {
    const title = `${data.amount} - ${data.name} | ${BRAND_NAME}`;
    const url = `${window.location.hostname}/scholarships/${id}`;
    const text = 
      `${data.amount} - ${data.name} | ${BRAND_NAME}\n` +
      `${data.deadline.toLocaleDateString()}\n`;
    if (navigator.share) {
      navigator
        .share({ title, url, text })
        .then(() => console.log('Thanks for sharing!'))
        .catch(console.error);
    } else {
      // TODO(https://github.com/beyondhb1079/s4us/issues/154): Share dialog for Web
      // Use the title/url/text above to construct the Share dialog.
      alert(`This feature is under construction. TODO: Share ${url}.`);
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
              <IconButton
                aria-label="share"
                color="primary"
                onClick={shareFn(id, data)}>
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
