import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Popover, InputLabel, Grid } from '@mui/material';
import {
  ArrowDropDown as ArrowDropDownIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import AmountTextField from './AmountTextField';

export default function AmountFilter(props) {
  const { min, max, onMinChange, onMaxChange } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const error = max > 0 && max < min;

  return (
    <>
      <Button
        variant="outlined"
        sx={{ margin: 1, height: (theme) => theme.spacing(4) }}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon color="primary" />}>
        Amount
      </Button>
      <Popover
        id="amount-filter"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Grid container>
          <Grid item sx={{ margin: 1 }}>
            <InputLabel sx={{ paddingLeft: 1 }}>Min Amount</InputLabel>
            <AmountTextField
              error={error}
              value={min || ''}
              onChange={onMinChange}
            />
          </Grid>
          <Grid
            item
            sx={{
              paddingTop: 2,
              display: 'flex',
              alignItems: 'center',
            }}>
            <RemoveIcon />
          </Grid>
          <Grid item sx={{ margin: 1 }}>
            <InputLabel sx={{ paddingLeft: 1 }}>Max Amount</InputLabel>
            <AmountTextField value={max || ''} onChange={onMaxChange} />
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}

AmountFilter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onMinChange: PropTypes.func.isRequired,
  onMaxChange: PropTypes.func.isRequired,
};
