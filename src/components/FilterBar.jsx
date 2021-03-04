import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import FilterDropDown from './FilterDropdown';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import qParams from '../lib/QueryParams';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  alignText: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const majors = {
  che: 'Chemical Eng.',
  cs: 'Computer Science',
  ds: 'Data Science',
};

const grades = {
  12: 'Highschool Senior',
  13: 'College Freshman',
  14: 'College Sophomore',
  15: 'College Junior',
  16: 'College Senior',
};

const sortOptions = {
  'deadline.asc': {
    desc: 'Deadline (Earliest to Latest)',
    field: 'deadline',
    dir: 'asc',
  },
  'deadline.desc': {
    desc: 'Deadline (Latest to Earliest)',
    field: 'deadline',
    dir: 'desc',
  },
  'amount.asc': {
    desc: 'Amount (Low to High)',
    field: 'amount.min',
    dir: 'asc',
  },
  'amount.desc': {
    desc: 'Amount (High to Low)',
    field: 'amount.max',
    dir: 'desc',
  },
};

const sortItems = Object.fromEntries(
  Object.entries(sortOptions).map(([k, v]) => [k, v.desc])
);

export default function FilterBar(props) {
  const { setQueryParam, queryParams } = props;
  const classes = useStyles();
  const { minAmount, maxAmount } = queryParams;

  function updateSortingParams(sortOption) {
    setQueryParam('sortBy', sortOption);
  }

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item className={classes.alignText}>
        <FilterDropDown label="Major" items={majors} />
        <GradeLevelFilter />
        <AmountFilter
          min={minAmount ?? 0}
          max={maxAmount ?? 0}
          onMinChange={(e) => setQueryParam(qParams.MIN_AMOUNT, e.target.value)}
          onMaxChange={(e) => setQueryParam(qParams.MAX_AMOUNT, e.target.value)}
        />
      </Grid>
      <Grid item className={classes.alignText}>
        Sort by
        <FilterDropDown
          label="Sorting"
          items={sortItems}
          value={queryParams.sortBy ?? 'deadline.asc'}
          removeNone
          onChange={updateSortingParams}
        />
      </Grid>
    </Grid>
  );
}

FilterBar.propTypes = {
  setQueryParam: PropTypes.func.isRequired,
  queryParams: PropTypes.objectOf(PropTypes.number),
};
FilterBar.defaultProps = {
  queryParams: {},
};
