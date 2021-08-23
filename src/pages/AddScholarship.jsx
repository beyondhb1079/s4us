import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import ScholarshipForm from '../components/ScholarshipForm';

function AddScholarship() {
  const [submissionAlert, setSubmissionAlert] = useState(null);

  return (
    <Container maxWidth="md">
      <h1>Submit a Scholarship</h1>
      <ScholarshipForm setSubmissionAlert={setSubmissionAlert} />
      {submissionAlert}
    </Container>
  );
}

export default AddScholarship;
