import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import FilterDropDown from './FilterDropdown';
import AmountFilter from './AmountFilter';
import { qParams, sortParams } from '../lib/QueryParams';

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

const sortingOptions = {
  deadlineAsc: 'Deadline (Earliest to Latest)',
  deadlineDesc: 'Deadline (Latest to Earliest)',
  amountAsc: 'Amount (Low to High)',
  amountDesc: 'Amount (High to Low)',
};

export default function FilterBar(props) {
  const { setQueryParam, queryParams } = props;
  const classes = useStyles();
  const { minAmount, maxAmount } = queryParams;

  function updateSortingParams(sortOption) {
    if (sortOption in sortParams) {
      setQueryParam('sortBy', sortOption);
    }
  }

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item className={classes.alignText}>
        <FilterDropDown label="Major" items={majors} />
        <FilterDropDown label="Grade" items={grades} />
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
          items={sortingOptions}
          value="sorting"
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
