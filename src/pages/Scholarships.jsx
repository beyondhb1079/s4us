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

  // sets min and max amount for the amount filter
  const setMinMax = (index, val) => {
    history.push({
      search: queryString.stringify({
        ...queryString.parse(location.search),
        [index]: val,
      }),
    });
  };

  const params = queryString.parse(location.search, { parseNumbers: true });
  const minParam = params.minAmount;
  const maxParam = params.maxAmount;

  if ((minParam && !Number.isInteger(minParam)) || minParam === 0) {
    delete params.minAmount;
    history.replace({ search: queryString.stringify(params) });
  }

  if ((maxParam && !Number.isInteger(maxParam)) || maxParam === 0) {
    delete params.maxAmount;
    history.replace({ search: queryString.stringify(params) });
  }

  useEffect(() => {
    // TODO: Create cancellable promises
    Scholarships.list({ sortField, sortDir })
      .then((results) => {
        const filterError = maxParam > 0 && maxParam <= minParam;

        if (filterError) setScholarships(results);
        else
          setScholarships(
            results.filter(({ data }) => {
              if (data.amount.type === AmountType.Unknown) return true;
              if (
                (minParam && data.amount.max < minParam) ||
                (maxParam && data.amount.min > maxParam)
              ) {
                return false;
              }
              return true;
            })
          );
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [sortDir, sortField, minParam, maxParam]);

  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar
        changeSortBy={setSortField}
        changeSortFormat={setSortDir}
        onAmountFilterChange={setMinMax}
        queryParams={params}
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
