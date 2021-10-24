import React, { useState, useEffect } from 'react';
import ScholarshipForm from '../components/ScholarshipForm';
// import SubmissionAlert from '../components/SubmissionAlert';
import Scholarships from '../models/Scholarships';
import { Container, Typography } from '@mui/material';

function EditScholarship({ history, location, match }) {
  const { id } = match.params;
  const [scholarship, setScholarship] = useState(location.state?.scholarship);
  const [error, setError] = useState();
  const loading = !error && (!scholarship || !scholarship.data);
  // const [submissionAlert, setSubmissionAlert] = useState(null);

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
    <ScholarshipForm
      scholarship={scholarship}
      submitFn={() => {}}
      onSubmitError={() => {}}
    />
  );
}

export default EditScholarship;
