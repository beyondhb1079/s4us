import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, Grid } from '@mui/material';
import { Remove as RemoveIcon } from '@mui/icons-material';
import AmountTextField from './AmountTextField';

export default function AmountFilter(props) {
  const { min, max, onMinChange, onMaxChange } = props;
  const error = max > 0 && max < min;

  return (
    <Grid container>
      <Grid item sx={{ m: 1 }}>
        <InputLabel sx={{ pl: 1 }}>Min</InputLabel>
        <AmountTextField
          error={error}
          value={min || ''}
          onChange={onMinChange}
        />
      </Grid>
      <Grid item sx={{ pt: 2, display: 'flex', alignItems: 'center' }}>
        <RemoveIcon />
      </Grid>
      <Grid item sx={{ m: 1 }}>
        <InputLabel sx={{ pl: 1 }}>Max</InputLabel>
        <AmountTextField value={max || ''} onChange={onMaxChange} />
      </Grid>
    </Grid>
  );
}

AmountFilter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onMinChange: PropTypes.func.isRequired,
  onMaxChange: PropTypes.func.isRequired,
};
