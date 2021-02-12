import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
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
  const location = useLocation();

  useEffect(() => {
    const params = queryString.parse(location.search);
    const minParam = parseInt(params.min ?? 0, 10);
    const maxParam = parseInt(params.max ?? 0, 10);
    setAmountFilterVals({
      min: minParam >= 0 ? minParam : 0,
      max: maxParam >= 0 ? maxParam : 0,
    });
  }, [location.search]);

  useEffect(() => {
    // TODO: Create cancellable promises
    Scholarships.list({ sortField, sortDir })
      .then((results) => {
        const filterError =
          amountFilterVals.max > 0 &&
          amountFilterVals.max <= amountFilterVals.min;
        if (
          (amountFilterVals.min === 0 && amountFilterVals.max === 0) ||
          filterError
        )
          setScholarships(results);
        else
          setScholarships(
            results.filter((result) =>
              FilterByAmount(result, amountFilterVals.min, amountFilterVals.max)
            )
          );
      })
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
        {...{ amountFilterVals }}
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
