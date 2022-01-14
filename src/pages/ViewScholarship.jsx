import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Container, Typography, Box } from '@mui/material';
import Scholarships from '../models/Scholarships';
import ScholarshipCard from '../components/ScholarshipCard';
import { Alert } from '@mui/material';
import bannerImg from '../img/detail-page-banner.jpg';

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
    <Container maxWidth="md">
      <Helmet>
        <title>{scholarship.data.name}</title>
      </Helmet>

      {location?.state?.alert && (
        <Alert
          color="primary"
          variant="filled"
          onClose={() => history.replace(`/scholarships/${scholarship.id}`)}>
          {`Scholarship successfully ${
            scholarship.data.dateAdded.getTime() ===
            scholarship.data.lastModified.getTime()
              ? 'submitted.'
              : 'updated.'
          }`}
        </Alert>
      )}

      <Box
        component="img"
        src={bannerImg}
        sx={{
          width: '100%',
          objectFit: 'cover',
          maxHeight: 250,
          objectPosition: { md: '0px -50px' },
        }}
      />

      <ScholarshipCard scholarship={scholarship} style="detail" />
    </Container>
  );
}

ViewScholarship.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};
