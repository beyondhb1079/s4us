import React, { useCallback } from 'react';
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
  Hidden,
  Drawer,
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

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  resultsArea: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '20vh',
  },
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
  },
  drawer: {
    width: 400,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 330,
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

  const smallScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const showDetail = !!selected;
  const showList = !smallScreen || !selected;
  return (
    <Container className={classes.root}>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      {!showList && (
        <Button color="primary" onClick={clearSelected}>
          Back to results
        </Button>
      )}
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left">
        <ScholarshipList
          listFn={listScholarships}
          selectedId={selected?.id}
          onItemSelect={(s) =>
            s.id === selected?.id ? clearSelected() : setSelected(s)
          }
        />
      </Drawer>
      <Box className={classes.resultsArea}>
        <Grid container spacing={3}>
          <Hidden xsDown={showDetail}>
            <Grid
              item
              xs={showDetail ? 6 : 12}
              className={showDetail ? classes.listBarView : classes.listView}>
              <FilterBar queryParams={params} {...{ setQueryParam }} />
              <ScholarshipList
                listFn={listScholarships}
                selectedId={selected?.id}
                onItemSelect={(s) =>
                  s.id === selected?.id ? clearSelected() : setSelected(s)
                }
              />
            </Grid>
          </Hidden>
          <Grid item xs>
            <Container maxWidth="md">
              {selected && <ScholarshipDetailCard scholarship={selected} />}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ListScholarships;
