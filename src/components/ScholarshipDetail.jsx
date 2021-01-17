import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Scholarships from '../models/Scholarships';

const useStyles = makeStyles(() => ({
  description: {
    whiteSpace: 'pre-line',
  },
}));

export default function ScholarshipDetail({ data }) {
  const classes = useStyles();

  const { name, amount, deadline, website, description } = data;

  return (
    <Container>
      <Typography gutterBottom variant="h3" component="h1">
        {name}
      </Typography>
      <Typography gutterBottom variant="h4" component="h2">
        {amount.toString()}
      </Typography>
      <Typography gutterBottom variant="h5" component="h3">
        {deadline.toLocaleDateString()}
      </Typography>
      <Typography
        gutterBottom
        variant="body1"
        component="p"
        className={classes.description}>
        {description}
      </Typography>

      <Button
        component={Link}
        href={website}
        color="primary"
        variant="contained">
        Apply
      </Button>
    </Container>
  );
}

ScholarshipDetail.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  // id: PropTypes.number.isRequired,
};
