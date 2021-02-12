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
  const [amountFilterVals, setAmountFilterVals] = useState({
    minAmount: 0,
    maxAmount: 0,
  });
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const params = queryString.parse(location.search, { parseNumbers: true });
    const minParam = params.min ?? 0;
    const maxParam = params.max ?? 0;
    setAmountFilterVals({
      minAmount: minParam > 0 ? minParam : 0,
      maxAmount: maxParam > 0 ? maxParam : 0,
    });

    const newParams = { ...params };
    if (!Number.isInteger(minParam) || minParam <= 0) delete newParams.min;
    if (!Number.isInteger(maxParam) || maxParam <= 0) delete newParams.max;
    history.push({ search: queryString.stringify(newParams) });
  }, [location.search, history]);

  useEffect(() => {
    // TODO: Create cancellable promises
    Scholarships.list({ sortField, sortDir })
      .then((results) => {
        const filterError =
          amountFilterVals.maxAmount > 0 &&
          amountFilterVals.maxAmount <= amountFilterVals.minAmount;
        if (
          (amountFilterVals.minAmount === 0 &&
            amountFilterVals.maxAmount === 0) ||
          filterError
        )
          setScholarships(results);
        else
          setScholarships(
            results.filter((result) =>
              FilterByAmount(
                result.data.amount,
                amountFilterVals.minAmount,
                amountFilterVals.maxAmount
              )
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
