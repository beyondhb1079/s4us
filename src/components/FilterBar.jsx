import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import FilterDropDown from './FilterDropdown';

const useStyles = makeStyles((theme) => ({
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

const amounts = {
  500: '> 500',
  1000: '> 1000',
  5000: '> 5000',
};

const sortingOptions = {
  deadlineSoon: 'Deadline (Earliest to Latest)',
  deadlineLatest: 'Deadline (Latest to Earliest)',
  amountLow: 'Amount (Low to High)',
  amountHigh: 'Amount (High to Low)',
};

function FilterBar() {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item>
        <FilterDropDown label="Major" items={majors} />
        <FilterDropDown label="Grade" items={grades} />
        <FilterDropDown label="Amount" items={amounts} />
      </Grid>
      <Grid item className={classes.alignText}>
        Sort by
        <FilterDropDown
          label="Sorting"
          items={sortingOptions}
          defaultSelect="deadlineSoon"
          removeNone
        />
      </Grid>
    </Grid>
  );
}

export default FilterBar;
