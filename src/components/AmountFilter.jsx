import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, Grid, Slider } from '@mui/material';
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
          onChange={(e) => onMinChange(e.target.value)}
        />
      </Grid>
      <Grid item sx={{ pt: 2, display: 'flex', alignItems: 'center' }}>
        <RemoveIcon />
      </Grid>
      <Grid item sx={{ m: 1 }}>
        <InputLabel sx={{ pl: 1 }}>Max</InputLabel>
        <AmountTextField
          value={max || ''}
          onChange={(e) => onMaxChange(e.target.value)}
        />
      </Grid>

      <Slider
        value={[min, max]}
        min={0}
        max={10000}
        step={100}
        onChange={(e) => {
          onMinChange(e.target.value[0]);
          onMaxChange(e.target.value[1]);
        }}
      />
    </Grid>
  );
}

AmountFilter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onMinChange: PropTypes.func.isRequired,
  onMaxChange: PropTypes.func.isRequired,
};
