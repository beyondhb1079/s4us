import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
  const [sortField, setSortField] = useState('deadline');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    // TODO: Create cancellable promises
    Scholarships.list({ sortField, sortDir })
      .then(setScholarships)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [sortDir, sortField]);

  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar changeSortBy={setSortField} changeSortFormat={setSortDir} />
      {error?.toString() ||
        (loading && <CircularProgress className={classes.progress} />) || (
          <ScholarshipList scholarships={scholarships} />
        )}
      <Box mt={24} mb={24} />
      <Button
        color="primary"
        onClick={() => {
          alert('clicked');
        }}>
        Load More
      </Button>
    </Container>
  );
}

export default ScholarshipsPage;
