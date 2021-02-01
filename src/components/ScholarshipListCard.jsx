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
import { BRAND_NAME } from '../config/constants';
import ShareDialog from './ShareDialog';

const useStyles = makeStyles((theme) => ({
  actions: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  content: {
    // paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(2),
    padding: theme.spacing(3),
  },
  deadline: {
    fontWeight: 'bold',
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

function ScholarshipListCard({ scholarship, id }) {
  const classes = useStyles();

  console.log(scholarship);

  return (
    <Card variant="outlined">
      <CardActionArea
        component={Link}
        to={{
          pathname: `/scholarships/${id}`,
          state: { scholarship: { id, scholarship } },
        }}>
        {/* 
        <CardHeader
          title={scholarship.name}
          subheader={scholarship.amount.toString()}
        />
        */}

        <CardContent className={classes.content}>
          <Typography
            component="span"
            variant="body3"
            className={classes.deadline}>
            {scholarship.deadline.toString()}
          </Typography>

          <Typography gutterBottom variant="body1">
            Deadline:{' '}
            <Typography component="span" color="primary">
              {scholarship.deadline.toLocaleDateString()}
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.description}>
            {scholarship.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/*
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
          // eslint-disable-next-line no-alert
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
      */}
    </Card>
  );
}

export default ScholarshipListCard;
