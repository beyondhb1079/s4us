import React, { useState, useEffect, useCallback } from 'react';
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

  if (params.sortBy && !(params.sortBy in sortOptions)) {
    pruneQueryParam('sortBy');
  }

  const sortBy = params.sortBy ?? DEFAULT_SORT_BY;

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

  const [loadMoreFn, setLoadMoreFn] = useState(() =>
    Scholarships.list({ sortField, sortDir })
  );

  const loadMoreScholarships = useCallback(
    (scholarshipsList) => {
      let mounted = true;
      scholarshipsList
        .then(({ results, next }) => {
          if (mounted) {
            setScholarships(
              results.filter((s) =>
                s.data.amount.intersectsRange(minAmount, maxAmount)
              )
            );
          }
          setLoadMoreFn(next);
        })
        .then(() => mounted && setError(null))
        .catch((e) => mounted && setError(e))
        .finally(() => mounted && setLoading(false));

      return () => {
        mounted = false;
      };
    },
    [minAmount, maxAmount]
  );

  useEffect(() => {
    if (maxAmount && maxAmount < minAmount) {
      setError('The minimum amount must be less than the Maximum.');
      return () => {};
    }
    // TODO: Create cancellable promises
    return loadMoreScholarships(Scholarships.list({ sortField, sortDir }));
  }, [sortDir, sortField, minAmount, maxAmount, loadMoreScholarships]);

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
              onClick={() => loadMoreScholarships(loadMoreFn)}>
              Load More
            </Button>
          </>
        )}
    </Container>
  );
}

export default ScholarshipsPage;
