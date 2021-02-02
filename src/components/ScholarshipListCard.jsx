import React from 'react';
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

  // mock data
  scholarship.description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  scholarship.city = 'City of Seattle';
  scholarship.amount = '$1,000';
  scholarship.tags = [
    { id: '1', title: 'Css' },
    { id: '3', title: 'GPA: 3.0' },
    { id: '2', title: 'HS Senior' },
    { id: '4', title: 'Css' },
    { id: '5', title: 'GPA: 3.0' },
    { id: '6', title: 'HS Senior' },
  ];

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
            {scholarship.amount}
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.description}>
            {scholarship.description}
          </Typography>

          <Box className={classes.tagWrapper}>
            {scholarship.tags.map((tag) => (
              <Box component="span" className={classes.tag}>
                {tag.title}
              </Box>
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ScholarshipListCard;
