import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import FilterDropDown from './FilterDropdown';
import SortDropDown from './SortDropdown';

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

export default function FilterBar(props) {
  const { changeSortBy, changeSortFormat } = props;
  const classes = useStyles();

  function updateSorting(sortingOption) {
    switch (sortingOption) {
      case 'deadlineSoon':
        changeSortBy('deadline');
        changeSortFormat('asc');
        break;
      case 'deadlineLatest':
        changeSortBy('deadline');
        changeSortFormat('desc');
        break;
      case 'amountLow':
        changeSortBy('amount.min');
        changeSortFormat('asc');
        break;
      case 'amountHigh': // note this might need mofication based on how we store amount.max
        changeSortBy('amount.max');
        changeSortFormat('desc');
        break;
      default:
    }
  }

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item>
        <FilterDropDown label="Major" items={majors} />
        <FilterDropDown label="Grade" items={grades} />
        <FilterDropDown label="Amount" items={amounts} />
      </Grid>
      <Grid item className={classes.alignText}>
        Sort by
        <SortDropDown items={sortingOptions} updateSorting={updateSorting} />
      </Grid>
    </Grid>
  );
}

FilterBar.propTypes = {
  changeSortBy: PropTypes.func.isRequired,
  changeSortFormat: PropTypes.func.isRequired,
};
