import React from 'react';
import PropTypes from 'prop-types';
import { Grid, FormControl, Select, MenuItem, IconButton } from '@mui/material';
import sortOptions, { DEADLINE_ASC } from '../lib/sortOptions';
import TuneIcon from '@mui/icons-material/Tune';

export default function FilterBar({ setQueryParam, queryParams, openFn }) {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <IconButton onClick={openFn} sx={{ display: { md: 'none' } }}>
            <TuneIcon />
          </IconButton>
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
    </>
  );
}

FilterBar.propTypes = {
  setQueryParam: PropTypes.func.isRequired,
  queryParams: PropTypes.shape({
    minAmount: PropTypes.number,
    maxAmount: PropTypes.number,
    sortBy: PropTypes.string,
  }),
  openFn: PropTypes.func.isRequired,
};
FilterBar.defaultProps = {
  queryParams: {},
};
