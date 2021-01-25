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
  const [sortBy, setSortBy] = useState('deadline');
  const [sortFormat, setSortFormat] = useState('asc');

  useEffect(() => {
    // TODO: Create cancellable promises
    Scholarships.list({ sortField: `${sortBy}`, sortDir: `${sortFormat}` })
      .then(setScholarships)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [sortBy, sortFormat]);

  const classes = useStyles();

  return (
    <Container>
      {console.log(`Currently sorting by: ${sortBy} + ${sortFormat}`)}
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar changeSortBy={setSortBy} changeSortFormat={setSortFormat} />
      {error?.toString() ||
        (loading && <CircularProgress className={classes.progress} />) || (
          <ScholarshipList scholarships={scholarships} />
        )}
    </Container>
  );
}

export default ScholarshipsPage;
