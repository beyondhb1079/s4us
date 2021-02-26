import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import FilterDropDown from './FilterDropdown';
import AmountFilter from './AmountFilter';
import { qParams } from '../lib/QueryParams';

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
  deadlineSoon: 'Deadline (Earliest to Latest)',
  deadlineLatest: 'Deadline (Latest to Earliest)',
  amountLow: 'Amount (Low to High)',
  amountHigh: 'Amount (High to Low)',
};

const sortParams = {
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

export default function FilterBar(props) {
  const { setQueryParam, queryParams } = props;
  const classes = useStyles();
  const { minAmount, maxAmount } = queryParams;

  function updateSortingParams(sortOption) {
    if (sortOption in sortParams) {
      setQueryParam('sortDir', sortParams[sortOption].dir);
      setQueryParam('sortField', sortParams[sortOption].field);
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
          defaultValue="deadlineSoon"
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
