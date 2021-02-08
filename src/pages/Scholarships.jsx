import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Box,
  CircularProgress,
  Container,
  makeStyles,
  Typography,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import queryString from 'query-string';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';
import ScholarshipDetailCard from '../components/ScholarshipDetailCard';

const useStyles = makeStyles((theme) => ({
  progress: {
    display: 'block',
    margin: 'auto',
  },
  resultsArea: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '20vh',
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

  useEffect(() => {
    let mounted = true;
    Scholarships.list({ sortField, sortDir })
      .then((results) => {
        if (mounted) setScholarships(results);
      })
      .catch((e) => {
        if (mounted) setError(e);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [sortDir, sortField]);

  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search, { parseNumbers: true });

  // Parse whether an item has been selected
  let selectedIndex = params.selectedIndex ?? undefined;
  if (
    typeof selectedIndex !== 'number' ||
    selectedIndex < 0 ||
    selectedIndex >= scholarships.length
  ) {
    selectedIndex = undefined;
  }
  const setSelectedIndex = (index) => {
    const newParams = { ...params, selectedIndex: index };
    if (index === selectedIndex) {
      delete newParams.selectedIndex;
    }

    history.push({ search: queryString.stringify(newParams) });
  };

  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const showDetail = selectedIndex !== undefined;
  const showList = largeScreen || !showDetail;
  return (
    <Container>
      {showList ? (
        <>
          <Typography
            variant="h3"
            component="h1"
            style={{ textAlign: 'center' }}>
            Scholarships
          </Typography>
          <FilterBar
            changeSortBy={setSortField}
            changeSortFormat={setSortDir}
          />
        </>
      ) : (
        <Button color="primary" onClick={() => setSelectedIndex(selectedIndex)}>
          Back to results
        </Button>
      )}
      <Box className={classes.resultsArea}>
        {error?.toString() ||
          (loading && <CircularProgress className={classes.progress} />) || (
            <Grid container spacing={3}>
              {showList && (
                <Grid item xs={12} md={showDetail ? 6 : 12}>
                  <ScholarshipList
                    scholarships={scholarships}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                  />
                  <Button
                    className={classes.loadMoreButton}
                    color="primary"
                    onClick={() =>
                      // eslint-disable-next-line no-alert
                      alert('TODO: Issue #94')
                    }>
                    Load More
                  </Button>
                </Grid>
              )}
              {showDetail && (
                <Grid item xs={12} md={6}>
                  <ScholarshipDetailCard
                    scholarship={{
                      id: scholarships[selectedIndex].id,
                      data: scholarships[selectedIndex].data,
                    }}
                  />
                </Grid>
              )}
            </Grid>
          )}
      </Box>
    </Container>
  );
}

export default ScholarshipsPage;
