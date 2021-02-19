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
import { DEFAULT_SORT_DIR, DEFAULT_SORT_FIELD } from '../config/constants';

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
  // const params = queryString.parse(location.search);

  const sortingOptions = {
    deadlineSoon: {
      field: 'deadline',
      dir: 'asc',
    },
    deadlineLatest: {
      field: 'deadline',
      dir: 'desc',
    },
    amountLow: {
      field: 'amount.min',
      dir: 'asc',
    },
    amountHigh: {
      field: 'amount.max',
      dir: 'desc',
    },
  };

  const validField =
    params.sortField === 'deadline' || params.sortField === 'amount';
  const validDir = params.sortDir === 'asc' || params.sortDir === 'desc';

  const setSort = (val) => {
    if (val in sortingOptions) {
      history.push({
        search: queryString.stringify({
          sortField: sortingOptions[val].field,
          sortDir: sortingOptions[val].dir,
        }),
      });
    }
  };

  if (params.sortField === 'amount') {
    if (validDir) {
      if (params.sortDir === 'asc') {
        setSort('amountLow');
      } else {
        setSort('amountHigh');
      }
    }
  }

  const sortField = validField ? params.sortField : DEFAULT_SORT_FIELD;
  const sortDir = validDir ? params.sortDir : DEFAULT_SORT_DIR;

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

  return (
    <Container>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar
        setSort={setSort}
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
