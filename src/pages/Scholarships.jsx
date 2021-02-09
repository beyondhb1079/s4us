import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';
import FilterByAmount from '../filter/FilterByAmount';

const useStyles = makeStyles((theme) => ({
  progress: {
    display: 'block',
    margin: 'auto',
  },
  loadMoreButton: {
    margin: theme.spacing(3, 0),
  },
}));

function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [sortField, setSortField] = useState('deadline');
  const [sortDir, setSortDir] = useState('asc');
  const [amountFilterVals, setAmountFilterVals] = useState({ min: 0, max: 0 });

  useEffect(() => {
    // TODO: Create cancellable promises
    Scholarships.list({ sortField, sortDir })
      .then((results) =>
        setScholarships(
          FilterByAmount(results, amountFilterVals.min, amountFilterVals.max)
        )
      )
      .catch(setError)
      .finally(() => setLoading(false));
  }, [sortDir, sortField, amountFilterVals]);

  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar
        changeSortBy={setSortField}
        changeSortFormat={setSortDir}
        {...{ amountFilterVals, setAmountFilterVals }}
      />
      {error?.toString() ||
        (loading && <CircularProgress className={classes.progress} />) || (
          <>
            <ScholarshipList scholarships={scholarships} />
            <Button
              className={classes.loadMoreButton}
              color="primary"
              onClick={() => {
                alert('clicked');
              }}>
              Load More
            </Button>
          </>
        )}
    </Container>
  );
}

export default ScholarshipsPage;
