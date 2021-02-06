import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScholarshipAmount from '../types/ScholarshipAmount';

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
    color: '#000',
    borderColor: '#3FB1B5',
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
            {scholarship.organization}
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.subtitle}
            gutterBottom>
            {scholarship.amount.toString()}
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
                  <Chip
                    label={tag.title}
                    variant="outlined"
                    className={classes.tag}
                  />
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
    organization: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.instanceOf(Date),
    amount: PropTypes.instanceOf(ScholarshipAmount),
    tags: PropTypes.arrayOf({ title: PropTypes.string }),
  }),
  id: PropTypes.string.isRequired,
};
ScholarshipListCard.defaultProps = {
  scholarship: {},
};

export default ScholarshipListCard;
