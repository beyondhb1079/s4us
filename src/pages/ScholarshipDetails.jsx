import React, { useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Container } from '@material-ui/core';
import Scholarships from '../models/Scholarships';
import { BRAND_NAME } from '../config/constants';
import ScholarshipDetailCard from '../components/ScholarshipDetailCard';

export default function ScholarshipDetails({ history, location, match }) {
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
        <h1>{error?.toString() || 'Loading...'}</h1>
      </Container>
    );
  }

  document.title = `${BRAND_NAME} | ${scholarship.data.name}`;

  return (
    <Container>
      <ScholarshipDetailCard scholarship={scholarship} />
    </Container>
  );
}

ScholarshipDetails.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};
