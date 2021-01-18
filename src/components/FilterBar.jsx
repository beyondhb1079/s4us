import React from 'react';
import {
  makeStyles,
  Grid,
  NativeSelect,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import FilterDropDown from './FilterDropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  buttonStyle: {
    border: '1px solid lightGray',
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

function FilterBar() {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item>
        <FilterDropDown label="Major" items={majors} />
        <FilterDropDown label="Grade" items={grades} />
        <FilterDropDown label="Amount" items={amounts} />
      </Grid>
      <Grid item>
        <FormControl className={classes.buttonStyle}>
          <InputLabel>Sorting</InputLabel>
          <NativeSelect defaultValue={10}>
            <option value={10}>Deadline (Earliest to Latest)</option>
            <option value={20}>Deadline (Latest to Earliest)</option>
            <option value={30}>Amount (Low to High)</option>
            <option value={40}>Amount (High to Low)</option>
          </NativeSelect>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default FilterBar;
