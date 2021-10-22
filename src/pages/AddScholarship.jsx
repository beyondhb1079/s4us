import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Alert, AlertTitle, Container, Typography } from '@mui/material';
import ScholarshipForm from '../components/ScholarshipForm';
import Scholarships from '../models/Scholarships';
import SubmissionAlert from '../components/SubmissionAlert';
import AmountType from '../types/AmountType';

function AddScholarship() {
  const [submissionAlert, setSubmissionAlert] = useState(null);

  const scholarship = Scholarships.new({
    name: '',
    deadline: null,
    description: '',
    amount: {
      type: AmountType.Fixed,
      min: 0,
      max: 0,
    },
    website: '',
    organization: '',
    tags: [],
    requirements: {},
  });

  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Add a Scholarship</title>
      </Helmet>
      <Typography variant="h4" gutterBottom>
        Submit a Scholarship
      </Typography>
      <ScholarshipForm
        scholarship={scholarship}
        submitFn={() =>
          setSubmissionAlert(
            <SubmissionAlert
              id={scholarship.id}
              name={scholarship.data.name}
              onClose={() => setSubmissionAlert(null)}
            />
          )
        }
        onSubmitError={(error) =>
          setSubmissionAlert(
            <Alert severity="error" onClose={() => setSubmissionAlert(null)}>
              <AlertTitle>Error</AlertTitle>
              {error.toString()}
            </Alert>
          )
        }
      />

      {submissionAlert}
    </Container>
  );
}
export default AddScholarship;
