import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';

const useStyles = makeStyles(() => ({
  resultsArea: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '20vh',
  },
}));

function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // TODO: Create cancellable promises
    Scholarships.list({ sortField: 'deadline' })
      .then((results) => setScholarships(results))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar />
      <Box className={classes.resultsArea}>
        {error?.toString() || (loading && <CircularProgress />) || (
          <ScholarshipList scholarships={scholarships} />
        )}
      </Box>
    </Container>
  );
}

export default ScholarshipsPage;
