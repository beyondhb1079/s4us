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
  const [sortList, setSortList] = useState('deadline');
  const [reverse, setReverse] = useState(false);

  function reverseDateArray() {
    setReverse(!reverse);
    setScholarships(scholarships.reverse());
  }

  useEffect(() => {
    // TODO: Create cancellable promises
    Scholarships.list({ sortField: `${sortList}` })
      .then((results) => {
        setScholarships(results);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sortList]);

  const classes = useStyles();

  return (
    <Container>
      <h1>{sortList}</h1>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar passedFunction={setSortList} reverse={reverseDateArray} />
      {error?.toString() ||
        (loading && <CircularProgress className={classes.progress} />) || (
          <ScholarshipList scholarships={scholarships} />
        )}
    </Container>
  );
}

export default ScholarshipsPage;
