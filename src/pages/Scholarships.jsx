import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import {
  Button,
  Box,
  Container,
  Typography,
  Grid,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';
import ScholarshipDetailCard from '../components/ScholarshipDetailCard';
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

const useStyles = makeStyles(() => ({
  resultsArea: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '20vh',
  },
}));

function ScholarshipsPage() {
  const classes = useStyles();
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

  // Parse selectedScholarship
  // Note: to avoid overcomplicating things we don't keep track of this in the URL.
  // Users can share a specific scholarship instead.
  const selectedScholarship = history.location.state?.scholarship;
  const setSelectedScholarship = (s) =>
    history.replace({ state: { scholarship: { id: s.id, data: s.data } } });
  const clearSelectedScholarship = () => history.replace({ state: {} });

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

  const listScholarships = () =>
    Scholarships.list({ sortField, sortDir, minAmount, maxAmount });

  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const showDetail = !!selectedScholarship;
  const showList = largeScreen || !showDetail;
  return (
    <Container>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      {showList ? (
        <FilterBar queryParams={params} {...{ setQueryParam }} />
      ) : (
        <Button color="primary" onClick={clearSelectedScholarship}>
          Back to results
        </Button>
      )}
      <Box className={classes.resultsArea}>
        <Grid container spacing={3}>
          {showList && (
            <Grid item xs={12} md={showDetail ? 6 : 12}>
              <ScholarshipList
                listFn={listScholarships}
                selectedId={selectedScholarship?.id}
                onItemSelect={setSelectedScholarship}
              />
            </Grid>
          )}
          {showDetail && (
            <Grid item xs={12} md={6}>
              <ScholarshipDetailCard scholarship={selectedScholarship} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default ScholarshipsPage;
