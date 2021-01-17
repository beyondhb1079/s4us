import React, { useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  Button,
  Container,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Scholarships from '../models/Scholarships';
import { BRAND_NAME } from '../config/constants';
import ScholarshipAmount from '../types/ScholarshipAmount';

const useStyles = makeStyles(() => ({
  description: {
    whiteSpace: 'pre-line',
  },
}));

export default function ScholarshipDetails({ history, location, match }) {
  console.log('location.state', location.state);
  const classes = useStyles();
  const { id } = match.params;
  const [scholarship, setScholarship] = useState(location.state?.scholarship);
  const [error, setError] = useState();
  const loading = !error && !scholarship;

  if (scholarship) {
    document.title = `${BRAND_NAME} | ${scholarship.data.name}`;
  }

  useEffect(() => {
    // Clear state in case of refresh/navigation to other pages.
    if (history.location.state?.scholarship) {
      history.replace({ state: {} });
    }
    // Fetch the scholarship if it wasn't passed
    if (!scholarship) {
      // Should we maybe set the scholarhip instead of loading every time?
      Scholarships.id(id).get().then(setScholarship).catch(setError);
    }
  }, [history, id, scholarship]);

  if (error || loading) {
    return (
      <Container>
        <h1>{error?.toString() || 'Loading...'}</h1>
      </Container>
    );
  }

  const { name, amount, deadline, website, description } = scholarship.data;

  return (
    <Container>
      <Typography gutterBottom variant="h3" component="h1">
        {name}
      </Typography>
      <Typography gutterBottom variant="h4" component="h2">
        {ScholarshipAmount.toString(amount)}
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

ScholarshipDetails.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};
