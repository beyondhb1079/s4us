import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
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

function ScholarshipListCard({ scholarship }) {
  const classes = useStyles();
  const { name, amount, deadline, description, organization, tags } =
    scholarship.data;

  return (
    <Card variant="outlined">
      <CardActionArea
        component={Link}
        to={{
          pathname: `/scholarships/${scholarship.id}`,
          state: { scholarship },
        }}>
        <CardContent className={classes.content}>
          <Typography variant="body1" className={classes.deadline}>
            {deadline?.toLocaleDateString()}
          </Typography>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {organization}
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.subtitle}
            gutterBottom>
            {ScholarshipAmount.toString(amount)}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.description}>
            {description}
          </Typography>
          <Box className={classes.tagWrapper}>
            {tags?.map(({ title, id }) => (
              <Chip
                key={id}
                label={title}
                variant="outlined"
                className={classes.tag}
              />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ScholarshipListCard.propTypes = {
  scholarship: PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string,
      organization: PropTypes.string,
      amount: PropTypes.shape({}),
      description: PropTypes.string,
      deadline: PropTypes.instanceOf(Date),
      website: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
        })
      ),
    }).isRequired,
  }).isRequired,
};

export default ScholarshipListCard;
