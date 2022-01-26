import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
  Popover,
} from '@mui/material';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import qParams from '../lib/QueryParams';
import sortOptions, { DEADLINE_ASC } from '../lib/sortOptions';
import MajorFilter from './MajorFilter';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FilterButton = ({ title, children, popoverWidth }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Button
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<ArrowDropDownIcon color="primary" />}
        sx={{ m: 1, height: (theme) => theme.spacing(4) }}>
        {title}
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ style: popoverWidth }}>
        {children}
      </Popover>
    </>
  );
};

FilterButton.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  popoverWidth: PropTypes.object,
};

FilterButton.defaultProps = {
  popoverWidth: undefined,
};

export default function FilterBar({ setQueryParam, queryParams }) {
  const { minAmount, maxAmount, grades, majors } = queryParams;

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      sx={{ flexGrow: 1 }}>
      <Grid item>
        <FilterButton title="Majors" popoverWidth={{ minWidth: 280 }}>
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
        </FilterButton>

        <FilterButton title="Grades">
          <GradeLevelFilter
            grades={new Set(grades)}
            changeFn={(e) => setQueryParam(qParams.GRADES, e)}
          />
        </FilterButton>

        <FilterButton title="Amount">
          <AmountFilter
            min={minAmount ?? 0}
            max={maxAmount ?? 0}
            onMinChange={(e) =>
              setQueryParam(qParams.MIN_AMOUNT, e.target.value)
            }
            onMaxChange={(e) =>
              setQueryParam(qParams.MAX_AMOUNT, e.target.value)
            }
          />
        </FilterButton>
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
