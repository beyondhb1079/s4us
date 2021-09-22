import React, { useState } from 'react';
import firebase from 'firebase';
import { Container } from '@material-ui/core';
import ScholarshipForm from '../components/ScholarshipForm';
import Scholarships from '../models/Scholarships';
import SubmissionAlert from '../components/SubmissionAlert';

function AddScholarship() {
  const [submissionAlert, setSubmissionAlert] = useState(null);
  const user = firebase.auth().currentUser;

  const scholarship = Scholarships.new({
    name: '',
    deadline: null,
    description: '',
    amount: {
      type: null,
      min: 0,
      max: 0,
    },
    website: '',
    organization: '',
    tags: [],
    author: { id: user?.uid, email: user?.email },
    requirements: {
      gpa: null,
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
      <h1>Submit a Scholarship</h1>
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
