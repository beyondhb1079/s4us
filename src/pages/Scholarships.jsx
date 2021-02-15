import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';
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
  const params = queryString.parse(location.search);

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

  useEffect(() => {
    // TODO: Create cancellable promises
    Scholarships.list({ sortField, sortDir })
      .then(setScholarships)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [sortDir, sortField]);

  return (
    <Container>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar setSort={setSort} />
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
