import React from 'react';
import { Grid, FormControl, Select, MenuItem, IconButton } from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import sortOptions, { DEADLINE_ASC } from '../lib/sortOptions';
import TuneIcon from '@mui/icons-material/Tune';

export default function FilterBar({ openFilter }) {
  const [{ sortBy }, setQueryParam] = useQueryParams();

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      sx={{ flexGrow: 1 }}>
      <Grid item>
        <IconButton
          onClick={openFilter}
          color="inherit"
          sx={{ display: { xs: 'block', md: 'none' } }}>
          <TuneIcon />
        </IconButton>
      </Grid>

      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
        Sort by
        <FormControl variant="outlined" sx={{ margin: 1, minWidth: 120 }}>
          <Select
            value={sortBy ?? DEADLINE_ASC}
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
