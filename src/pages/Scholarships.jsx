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
import { DEFAULT_SORT_URL_VALUE } from '../config/constants';

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
  const [sortField, setSortField] = useState('deadline');
  const [sortDir, setSortDir] = useState('asc');
  const history = useHistory();
  const location = useLocation();
  const setFoo = (val) => {
    history.push({
      search: queryString.stringify({
        ...queryString.parse(location.search),
        sorting: val,
      }),
    });
  };
  const foo = queryString.parse(location.search).foo ?? DEFAULT_SORT_URL_VALUE;

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
      <FilterBar
        changeSortBy={setSortField}
        changeSortFormat={setSortDir}
        changeURL={setFoo}
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
