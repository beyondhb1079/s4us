import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Container, Typography } from '@mui/material';
import Scholarships from '../models/Scholarships';
import ScholarshipDetailCard from '../components/ScholarshipDetailCard';

export default function ViewScholarship({ history, location, match }) {
  const { id } = match.params;
  const [scholarship, setScholarship] = useState(location.state?.scholarship);
  const [error, setError] = useState();
  const loading = !error && (!scholarship || !scholarship.data);

  // Clear location state in case of refresh/navigation to other pages.
  useEffect(() => {
    if (location.state?.scholarship) {
      history.replace({ state: {} });
    }
  }, [history, location]);

  // Fetch the scholarship if we need to load it
  useEffect(() => {
    let mounted = true;
    if (loading) {
      Scholarships.id(id)
        .get()
        .then((s) => mounted && setScholarship(s))
        .catch((e) => mounted && setError(e));
    }
    return () => {
      mounted = false;
    };
  }, [id, loading]);

  if (error || loading) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          {error?.toString() || 'Loading...'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Helmet>
        <title>{scholarship.data.name}</title>
      </Helmet>
      <ScholarshipDetailCard scholarship={scholarship} />
    </Container>
  );
}

ViewScholarship.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};
