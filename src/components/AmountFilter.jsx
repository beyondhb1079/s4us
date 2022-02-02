import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, Grid, Slider } from '@mui/material';
import { Remove as RemoveIcon } from '@mui/icons-material';
import AmountTextField from './AmountTextField';
import experiments from '../lib/experiments';

export default function AmountFilter(props) {
  const { min, max, onMinChange, onMaxChange } = props;
  const error = max > 0 && max < min;

  return (
    <Grid container spacing={2}>
      <Grid item>
        <InputLabel>Min</InputLabel>
        <AmountTextField
          error={error}
          value={min || ''}
          onChange={(e) => onMinChange(e.target.value)}
          placeholder="No min"
        />
      </Grid>
      <Grid item sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <RemoveIcon />
      </Grid>
      <Grid item>
        <InputLabel>Max</InputLabel>
        <AmountTextField
          value={max || ''}
          onChange={(e) => onMaxChange(e.target.value)}
          placeholder="No max"
        />
      </Grid>

      {experiments.expShowSlider && (
        <Slider
          defaultValue={[0, 10000]}
          min={0}
          max={50000}
          step={100}
          onChange={(e) => {
            onMinChange(e.target.value[0]);
            onMaxChange(e.target.value[1]);
          }}
          sx={{ mt: 1 }}
        />
      )}
    </Grid>
  );
}

AmountFilter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onMinChange: PropTypes.func.isRequired,
  onMaxChange: PropTypes.func.isRequired,
};
