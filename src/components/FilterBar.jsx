import React from 'react';
import PropTypes from 'prop-types';
import { Grid, FormControl, Select, MenuItem } from '@mui/material';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import qParams from '../lib/QueryParams';
import sortOptions, { DEADLINE_ASC } from '../lib/sortOptions';
import MajorFilter from './MajorFilter';

export default function FilterBar({ setQueryParam, queryParams }) {
  const { minAmount, maxAmount, grades, majors } = queryParams;

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      sx={{ flexGrow: 1 }}>
      <Grid item>
        <MajorFilter
          majors={majors}
          changeFn={(e) => setQueryParam(qParams.MAJORS, e)}
        />

        <GradeLevelFilter
          grades={new Set(grades)}
          changeFn={(e) => setQueryParam(qParams.GRADES, e)}
        />

        <AmountFilter
          min={minAmount ?? 0}
          max={maxAmount ?? 0}
          onMinChange={(e) => setQueryParam(qParams.MIN_AMOUNT, e.target.value)}
          onMaxChange={(e) => setQueryParam(qParams.MAX_AMOUNT, e.target.value)}
        />
      </Grid>

      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
        Sort by
        <FormControl variant="outlined" sx={{ margin: 1, minWidth: 120 }}>
          <Select
            value={queryParams.sortBy ?? DEADLINE_ASC}
            onChange={(e) => setQueryParam('sortBy', e.target.value)}
            displayEmpty
            sx={{ height: (theme) => theme.spacing(4) }}>
            {Object.keys(sortOptions).map((key) => (
              <MenuItem key={key} value={key}>
                {sortOptions[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
