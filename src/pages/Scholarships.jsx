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

  const sortField =
    queryString.parse(location.search).sortField ?? DEFAULT_SORT_FIELD;
  const sortDir =
    queryString.parse(location.search).sortDir ?? DEFAULT_SORT_DIR;

  const setSortField = (val) => {
    history.push({
      search: queryString.stringify({
        ...queryString.parse(location.search),
        sortField: val,
        sortDir,
      }),
    });
  };

  const setSortDir = (val) => {
    history.push({
      search: queryString.stringify({
        sortField,
        sortDir: val,
      }),
    });
  };

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
      <FilterBar setSortField={setSortField} setSortDir={setSortDir} />
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
