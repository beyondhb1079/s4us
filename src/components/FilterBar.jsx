import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import FilterDropDown from './FilterDropdown';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import qParams from '../lib/QueryParams';
import sortOptions, { DEADLINE_ASC } from '../lib/sortOptions';
import experiments from '../lib/experiments';

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

export default function FilterBar(props) {
  const { setQueryParam, queryParams } = props;
  const classes = useStyles();
  const { minAmount, maxAmount, grades } = queryParams;

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item className={classes.alignText}>
        {experiments.expShowMajorFilter && (
          <FilterDropDown label="Major" items={majors} />
        )}
        {experiments.expShowGradeFilter && (
          <GradeLevelFilter
            grades={grades ?? []}
            changeFn={(e) => setQueryParam('grades', e)}
          />
        )}
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
          items={sortOptions}
          value={queryParams.sortBy ?? DEADLINE_ASC}
          removeNone
          onChange={(option) => setQueryParam('sortBy', option)}
        />
      </Grid>
    </Grid>
  );
}

FilterBar.propTypes = {
  setQueryParam: PropTypes.func.isRequired,
  queryParams: PropTypes.shape({
    minAmount: PropTypes.number,
    maxAmount: PropTypes.number,
    sortBy: PropTypes.string,
  }),
};
FilterBar.defaultProps = {
  queryParams: {},
};
