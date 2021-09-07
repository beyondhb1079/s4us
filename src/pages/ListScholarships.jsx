import React, { useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import {
  // Button,
  Box,
  Container,
  // Typography,
  Grid,
  // useMediaQuery,
  makeStyles,
  Hidden,
  Drawer,
  CssBaseline,
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
  root: {},
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
    maxWidth: '800px',
  },
  listBarView: {
    // when it appears on the left
    maxHeight: '100vh',
    overflowY: 'auto',
    position: 'sticky',
    top: 0,
    maxWidth: '40vw',
  },
}));

const drawerWidth = 240;

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

  // const smallScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const showDetail = !!selected;
  // const showList = !smallScreen || !selected;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <Typography
        variant="h3"
        component="h1"
        style={{ textAlign: 'center' }}
        gutterBottom>
        Scholarships
      </Typography>
      {!showList && (
        <Button color="primary" onClick={clearSelected}>
          Back to results
        </Button>
      )} */}
      <Box
        component="nav"
        style={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folder">
        <Drawer
          variant="permanent"
          style={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
            width: drawerWidth,
            flexShrink: 0,
          }}
          anchor="left">
          Something here for you all to see that is very long and has no end.
          Something here for you all to see that is very long and has no end.
        </Drawer>
      </Box>
      {/* </nav> */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className={classes.resultsArea}>
        <Grid container spacing={3} justifyContent="space-around">
          <Hidden xsDown={showDetail}>
            <Grid
              item
              xs
              className={
                showDetail ? classes.listBarView : classes.listContainerView
              }>
              <Container maxWidth="md" disableGutters>
                <FilterBar queryParams={params} {...{ setQueryParam }} />
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
              <ScholarshipDetailCard scholarship={selected} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default ListScholarships;
