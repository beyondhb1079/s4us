import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import FilterDropDown from './FilterDropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
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

export default function FilterBar(props) {
  const { passedFunction } = props;

  function modifySorting(sortOption) {
    switch (sortOption) {
      case 'one':
        return passedFunction('deadline');
      case 'two':
        return passedFunction('deadlineReverse');
      case 'three':
        return passedFunction('amount.min');
      case 'four':
        return passedFunction('amount.max');
      default:
        return null;
    }
  }

  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item>
        <FilterDropDown label="Major" items={majors} defaultSelect="" />
        <FilterDropDown label="Grade" items={grades} defaultSelect="" />
        <FilterDropDown label="Amount" items={amounts} defaultSelect="" />
      </Grid>
      <Grid item>
        <FilterDropDown
          label="Sorting"
          items={sortingOptions}
          defaultSelect="deadlineSoon"
          removeNone
          givenFunction={modifySorting}
        />
      </Grid>
    </Grid>
  );
}

FilterBar.propTypes = {
  passedFunction: PropTypes.func.isRequired,
};
