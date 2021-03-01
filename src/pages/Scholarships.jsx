import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
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
import qParams from '../lib/QueryParams';

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

  const location = useLocation();
  const history = useHistory();

  const params = queryString.parse(location.search, { parseNumbers: true });
  const { minAmount, maxAmount } = params;

  const setQueryParam = (index, val) => {
    history.push({
      search: queryString.stringify({
        ...params,
        [index]: val,
      }),
    });
  };

  const pruneQueryParam = (index) => {
    delete params[index];
    history.replace({ search: queryString.stringify(params) });
  };

  if (
    minAmount !== undefined &&
    !(Number.isInteger(minAmount) && minAmount > 0)
  ) {
    pruneQueryParam(qParams.MIN_AMOUNT);
  }

  if (
    maxAmount !== undefined &&
    !(Number.isInteger(maxAmount) && maxAmount > 0)
  ) {
    pruneQueryParam(qParams.MAX_AMOUNT);
  }

  useEffect(() => {
    if (maxAmount && maxAmount < minAmount) {
      setError('The minimum amount must be less than the Maximum.');
      return;
    }
    // TODO: Create cancellable promises
    Scholarships.list({ sortField, sortDir })
      .then((results) =>
        setScholarships(
          results.filter((s) =>
            s.data.amount.intersectsRange(minAmount, maxAmount)
          )
        )
      )
      .then(() => setError(null))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [sortDir, sortField, minAmount, maxAmount]);

  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar
        changeSortBy={setSortField}
        changeSortFormat={setSortDir}
        queryParams={params}
        {...{ setQueryParam }}
      />
      {error?.toString() ||
        (loading && <CircularProgress className={classes.progress} />) || (
          <>
            <ScholarshipList scholarships={scholarships} />
            <Button
              className={classes.loadMoreButton}
              color="primary"
              // eslint-disable-next-line no-alert
              onClick={() => alert('clicked')}>
              Load More
            </Button>
          </>
        )}
    </Container>
  );
}

export default ScholarshipsPage;
