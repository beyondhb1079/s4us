import React, { useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  makeStyles,
  Hidden,
} from '@material-ui/core';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';
import ScholarshipDetailCard from '../components/ScholarshipDetailCard';
import qParams from '../lib/QueryParams';
import sortOptions, {
  DEADLINE_ASC,
  getDir,
  getField,
} from '../lib/sortOptions';

const useStyles = makeStyles((theme) => ({
  listContainerView: {
    // main centered view
    position: 'sticky',
    top: 0,
  },
  listBarView: {
    // when it appears on the left
    maxHeight: '100vh',
    overflowY: 'auto',
    position: 'sticky',
    top: 0,
    maxWidth: '480px',
  },
  filters: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

function ListScholarships() {
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

  // Parse selected scholarship
  // Note: to avoid overcomplicating things we don't keep track of this in the URL.
  // Users can share a specific scholarship instead.
  const selected = history.location.state?.scholarship;
  const setSelected = (s) =>
    history.replace({
      state: {
        scholarship: { id: s.id, data: s.data },
      },
    });
  const clearSelected = () => history.replace({ state: {} });

  const sortBy = params.sortBy ?? DEADLINE_ASC;

  const sortField = getField(sortBy);
  const sortDir = getDir(sortBy);

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

  const listScholarships = useCallback(
    () => Scholarships.list({ sortField, sortDir, minAmount, maxAmount }),
    [sortField, sortDir, minAmount, maxAmount]
  );

  const showDetail = !!selected;
  return (
    <Container>
      <Typography
        variant="h3"
        component="h1"
        style={{ textAlign: 'center' }}
        gutterBottom>
        Scholarships
      </Typography>
      <Grid container spacing={3} justifyContent="space-around">
        <Hidden xsDown={showDetail}>
          <Grid
            item
            xs
            className={
              showDetail ? classes.listBarView : classes.listContainerView
            }>
            <Container maxWidth="md" disableGutters>
              <Box className={classes.filters}>
                <FilterBar queryParams={params} {...{ setQueryParam }} />
              </Box>
              <ScholarshipList
                listFn={listScholarships}
                selectedId={selected?.id}
                onItemSelect={(s) =>
                  s.id === selected?.id ? clearSelected() : setSelected(s)
                }
              />
            </Container>
          </Grid>
        </Hidden>
        {selected && (
          <Grid item xs>
            <Hidden smUp>
              <Button color="primary" onClick={clearSelected}>
                Back to results
              </Button>
            </Hidden>
            <ScholarshipDetailCard scholarship={selected} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default ListScholarships;
