import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';

const useStyles = makeStyles(() => ({
  progress: {
    display: 'block',
    margin: 'auto',
  },
}));

function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // TODO: Create cancellable promises
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
  }, []);

  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar />
      {error?.toString() ||
        (loading && <CircularProgress className={classes.progress} />) || (
          <ScholarshipList scholarships={scholarships} />
        )}
    </Container>
  );
}

export default ScholarshipsPage;
