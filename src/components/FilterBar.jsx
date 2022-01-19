import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  Drawer,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import qParams from '../lib/QueryParams';
import sortOptions, { DEADLINE_ASC } from '../lib/sortOptions';
import MajorFilter from './MajorFilter';
import TuneIcon from '@mui/icons-material/Tune';

export default function FilterBar({ setQueryParam, queryParams }) {
  const { minAmount, maxAmount, grades, majors } = queryParams;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { sm: 'none' } }}>
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

      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(!drawerOpen)}>
        <MajorFilter
          majors={majors}
          onSelect={(m) => setQueryParam(qParams.MAJORS, m)}
          onDelete={(m) =>
            setQueryParam(
              qParams.MAJORS,
              majors.filter((major) => major !== m)
            )
          }
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
      </Drawer>
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
};
FilterBar.defaultProps = {
  queryParams: {},
};
