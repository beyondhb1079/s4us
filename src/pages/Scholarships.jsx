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

const sortOptions = {
  'deadline.asc': {
    field: 'deadline',
    dir: 'asc',
  },
  'deadline.desc': {
    field: 'deadline',
    dir: 'desc',
  },
  'amount.asc': {
    field: 'amount.min',
    dir: 'asc',
  },
  'amount.desc': {
    field: 'amount.max',
    dir: 'desc',
  },
};
const DEFAULT_SORT_BY = 'deadline.asc';

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
  const classes = useStyles();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const history = useHistory();
  const location = useLocation();

  const params = queryString.parse(location.search, { parseNumbers: true });

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

  const sortBy = params.sortBy ?? DEFAULT_SORT_BY;

  if (!sortOptions.hasOwnProperty('deadline.asc')) {
    pruneQueryParam('sortBy');
  }

  const sortField = sortOptions[sortBy].field;
  const sortDir = sortOptions[sortBy].dir;

  const { minAmount, maxAmount } = params;

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

  return (
    <Container>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar queryParams={params} {...{ setQueryParam }} />
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
