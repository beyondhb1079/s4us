import React, { useState } from 'react';
import { Menu, MenuItem, Toolbar, Box, Button } from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import sortOptions, { DEADLINE_ASC } from '../lib/sortOptions';
import TuneIcon from '@mui/icons-material/Tune';
import PropTypes from 'prop-types';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export default function FilterBar({ openFilter }) {
  const [{ sortBy }, setQueryParam] = useQueryParams();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Toolbar sx={{ bgcolor: 'primary.main', justifyContent: 'space-between' }}>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="secondary"
        startIcon={<ImportExportIcon />}>
        Sort
      </Button>

      <Box
        item
        sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
        <Button onClick={openFilter} color="secondary" startIcon={<TuneIcon />}>
          Filter
        </Button>
      </Box>

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
    </Toolbar>
  );
}

FilterBar.propTypes = {
  openFilter: PropTypes.func.isRequired,
};
