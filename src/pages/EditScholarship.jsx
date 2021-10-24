import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { Container, Typography, Alert, AlertTitle } from '@mui/material';
import ScholarshipForm from '../components/ScholarshipForm';
import SubmissionAlert from '../components/SubmissionAlert';
import Scholarships from '../models/Scholarships';

function EditScholarship({ history, location, match }) {
  const { id } = match.params;
  const [scholarship, setScholarship] = useState(location.state?.scholarship);
  const [error, setError] = useState();
  const loading = !error && (!scholarship || !scholarship.data);
  const [submissionAlert, setSubmissionAlert] = useState(null);

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

  useEffect(() => {
    const authorId = scholarship?.data?.author?.id;
    if (authorId && firebase.auth()?.currentUser?.uid != authorId)
      setError("You don't have permission to edit this scholarship.");
  }, [scholarship]);

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
      <ScholarshipForm
        scholarship={scholarship}
        submitFn={() =>
          setSubmissionAlert(
            <SubmissionAlert
              id={id}
              name={scholarship.data.name}
              onClose={() => setSubmissionAlert(null)}
            />
          )
        }
        onSubmitError={(err) =>
          setSubmissionAlert(
            <Alert severity="error" onClose={() => setSubmissionAlert(null)}>
              <AlertTitle>Error</AlertTitle>
              {err.toString()}
            </Alert>
          )
        }
      />
      {submissionAlert}
    </Container>
  );
}

export default EditScholarship;
