import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import FilterDropDown from './FilterDropdown';
import AmountFilter from './AmountFilter';

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

export default function FilterBar(props) {
  const { changeSortBy, changeSortFormat, changeURL } = props;
  const classes = useStyles();

  function updateSorting(sortingOption) {
    switch (sortingOption) {
      case 'deadlineSoon':
        changeSortBy('deadline');
        changeSortFormat('asc');
        changeURL('sortField=deadline&sortDir=asc');
        break;
      case 'deadlineLatest':
        changeSortBy('deadline');
        changeSortFormat('desc');
        changeURL('sortField=deadline&sortDir=desc');
        break;
      case 'amountLow':
        changeSortBy('amount.min');
        changeSortFormat('asc');
        changeURL('sortField=amount.min&sortDir=asc');
        break;
      case 'amountHigh':
        changeSortBy('amount.max');
        changeSortFormat('desc');
        changeURL('sortField=amount.max&sortDir=desc');
        break;
      default:
    }
  }

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item className={classes.alignText}>
        <FilterDropDown label="Major" items={majors} />
        <FilterDropDown label="Grade" items={grades} />
        <AmountFilter />
      </Grid>
      <Grid item className={classes.alignText}>
        Sort by
        <FilterDropDown
          label="Sorting"
          items={sortingOptions}
          defaultValue="deadlineSoon"
          removeNone
          onChange={updateSorting}
        />
      </Grid>
    </Grid>
  );
}

FilterBar.propTypes = {
  changeSortBy: PropTypes.func.isRequired,
  changeSortFormat: PropTypes.func.isRequired,
  changeURL: PropTypes.func.isRequired,
};
