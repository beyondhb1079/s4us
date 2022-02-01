import React, { useState } from 'react';
import {
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import sortOptions, { DEADLINE_ASC } from '../lib/sortOptions';
import TuneIcon from '@mui/icons-material/Tune';
import PropTypes from 'prop-types';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export default function FilterBar({ openFilter }) {
  const [{ sortBy }, setQueryParam] = useQueryParams();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Box sx={{ pb: 3 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        direction="row-reverse"
        sx={{ flexGrow: 1, bgcolor: 'primary.main', p: 2 }}>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            color="secondary">
            <ImportExportIcon />
          </IconButton>
          <Typography color="secondary">Sort</Typography>
        </Grid>

        <Grid
          item
          sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton onClick={openFilter} color="secondary">
            <TuneIcon />
          </IconButton>

          <Typography color="secondary">Filter</Typography>
        </Grid>
      </Grid>

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}>
        {Object.keys(sortOptions).map((key) => (
          <MenuItem
            key={key}
            selected={key === (sortBy ?? DEADLINE_ASC)}
            onClick={() => {
              setQueryParam('sortBy', key);
              setAnchorEl(null);
            }}>
            {sortOptions[key]}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

FilterBar.propTypes = {
  openFilter: PropTypes.func.isRequired,
};
