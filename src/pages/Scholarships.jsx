import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';

function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // TODO: Cancellable promises
    Scholarships.list({ sortField: 'deadline' })
      .then((results) => {
        setScholarships(results);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  if (error || loading) {
    return (
      <Container>
        <h1>{error?.toString() || 'Loading...'}</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h2" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar />
      <ScholarshipList scholarships={scholarships} />
    </Container>
  );
}

export default ScholarshipsPage;
