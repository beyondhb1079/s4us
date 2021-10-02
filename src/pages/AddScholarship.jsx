import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import firebase from 'firebase';
import { Container, Typography } from '@material-ui/core';
import ScholarshipForm from '../components/ScholarshipForm';
import Scholarships from '../models/Scholarships';
import SubmissionAlert from '../components/SubmissionAlert';
import AmountType from '../types/AmountType';

function AddScholarship() {
  const [submissionAlert, setSubmissionAlert] = useState(null);
  const user = firebase.auth().currentUser;

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
    author: { id: user?.uid, email: user?.email },
    requirements: {
      gpa: 0,
      ethnicities: [],
      majors: [],
      schools: [],
      grades: [],
      states: [],
      genders: [],
    },
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
        onSubmitError={() =>
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
