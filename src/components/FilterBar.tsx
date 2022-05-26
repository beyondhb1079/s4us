import React, { useState } from 'react';
import { Menu, MenuItem, Toolbar, Button, Container } from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import sortOptions, { DEADLINE_ASC, getSortOption } from '../lib/sortOptions';
import TuneIcon from '@mui/icons-material/Tune';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useTranslation } from 'react-i18next';

export default function FilterBar({
  openFilter,
}: {
  openFilter: () => void;
}): JSX.Element {
  const [{ sortBy, grades, majors, minAmount }, setQueryParams] =
    useQueryParams();
  const [anchorEl, setAnchorEl] = useState(null as HTMLElement | null);

  const filterCount =
    (grades?.length ?? 0) + (majors?.length ?? 0) + (minAmount ? 1 : 0);
  const { t } = useTranslation('filters');

  return (
    <Toolbar
      disableGutters
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'grey.300',
      }}>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <Button
          onClick={openFilter}
          startIcon={<TuneIcon />}
          sx={{ display: { md: 'none' } }}>
          {t('filters')} {filterCount ? `(${filterCount})` : ''}
        </Button>

        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          startIcon={<ImportExportIcon />}>
          {t('sort')}
        </Button>
      </Container>

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}>
        {sortOptions.map((key) => (
          <MenuItem
            key={key}
            selected={key === (sortBy ?? DEADLINE_ASC)}
            onClick={() => {
              setQueryParams({ sortBy: key });
              setAnchorEl(null);
            }}>
            {getSortOption(key, t)}
          </MenuItem>
        ))}
      </Menu>
    </Toolbar>
  );
}
