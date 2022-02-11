import React, { useState } from 'react';
import { Menu, MenuItem, Toolbar, Button, Container } from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import sortOptions, { DEADLINE_ASC } from '../lib/sortOptions';
import TuneIcon from '@mui/icons-material/Tune';
import PropTypes from 'prop-types';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export default function FilterBar({ openFilter }) {
  const [{ sortBy }, setQueryParams] = useQueryParams();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Toolbar disableGutters sx={{ bgcolor: 'primary.main' }}>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          justifyContent: { xs: 'space-between', md: 'flex-end' },
        }}>
        <Button
          onClick={openFilter}
          color="secondary"
          startIcon={<TuneIcon />}
          sx={{ display: { md: 'none' } }}>
          Filter
        </Button>

        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color="secondary"
          startIcon={<ImportExportIcon />}>
          Sort
        </Button>
      </Container>

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
              setQueryParams({ sortBy: key });
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
