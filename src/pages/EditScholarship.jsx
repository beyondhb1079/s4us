import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import { Container, Paper, Typography } from '@mui/material';
import ScholarshipForm from '../components/ScholarshipForm';
import SubmissionAlert from '../components/SubmissionAlert';
import Scholarships from '../models/Scholarships';
import { Helmet } from 'react-helmet';

function EditScholarship() {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(undefined);
  const [error, setError] = useState();
  const [submissionAlert, setSubmissionAlert] = useState(null);

  // Fetch the scholarship
  useEffect(() => {
    let mounted = true;

    Scholarships.id(id)
      .get()
      .then((s) => mounted && setScholarship(s))
      .catch((e) => mounted && setError(e));

    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    const authorId = scholarship?.data?.author?.id;
    if (authorId && firebase.auth()?.currentUser?.uid != authorId)
      setError("You don't have permission to edit this scholarship.");
  }, [scholarship]);

  if (error || !scholarship) {
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
        <title>Edit a scholarship</title>
      </Helmet>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
        <ScholarshipForm
          scholarship={scholarship}
          onSubmit={(s) => {
            setScholarship(s);
            setSubmissionAlert(
              <SubmissionAlert
                id={s.id}
                name={s.data.name}
                onClose={() => setSubmissionAlert(null)}
              />
            );
          }}
        />
        {submissionAlert}
      </Paper>
    </Container>
  );
}

export default EditScholarship;