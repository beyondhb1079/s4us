import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  actions: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(3),
  },
  subtitle: {
    fontWeight: '500',
  },
  deadline: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  description: {
    display: '-webkit-box',
    '-webkit-line-clamp': 5,
    lineClamp: 5,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    whiteSpace: 'pre-line',
    marginBottom: theme.spacing(3),
  },
  tagWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '50px',
    border: '1px solid #3FB1B5',
    padding: '12px 18px',
  },
}));

function ScholarshipListCard({ scholarship, id }) {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardActionArea
        component={Link}
        to={{
          pathname: `/scholarships/${id}`,
          state: { scholarship: { id, scholarship } },
        }}>
        <CardContent className={classes.content}>
          <Typography variant="body1" className={classes.deadline}>
            {scholarship.deadline.toLocaleDateString()}
          </Typography>
          <Typography variant="h5">{scholarship.name}</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {scholarship.city}
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.subtitle}
            gutterBottom>
            $1,000
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.description}>
            {scholarship.description}
          </Typography>
          <Box className={classes.tagWrapper}>
            {scholarship.tags
              ? scholarship.tags.map((tag) => (
                  <Box component="span" className={classes.tag}>
                    {tag.title}
                  </Box>
                ))
              : null}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ScholarshipListCard.propTypes = {
  scholarship: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.instanceOf(Date),
    tags: PropTypes.arrayOf({ title: PropTypes.string }),
  }),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
ScholarshipListCard.defaultProps = {
  scholarship: {},
};

export default ScholarshipListCard;
