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
import AmountType from '../types/AmountType';
import { intersectsRange } from '../types/ScholarshipAmount';

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

  const clearQueryParam = (index) => {
    const newParams = { ...params };
    delete newParams[index];
    history.replace({ search: queryString.stringify(newParams) });
  };

  useEffect(() => {
    // TODO: Create cancellable promises
    Scholarships.list({ sortField, sortDir })
      .then((results) => {
        if (maxAmount > 0 && maxAmount <= minAmount)
          setError('The minimum amount must be less than the Maximum.');
        else {
          setError(null);
          setScholarships(
            results.filter(({ data }) => {
              if (data.amount.type === AmountType.Unknown) return true;
              return intersectsRange(
                data.amount.min,
                data.amount.max,
                minAmount,
                maxAmount
              );
            })
          );
        }
      })
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
        {...{ setQueryParam, clearQueryParam }}
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
