import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, Stack, Slider } from '@mui/material';
import AmountTextField from './AmountTextField';

export default function MinAmountFilter(props) {
  const { min, onMinChange } = props;
  const error = min < 0;

  return (
    <Stack alignItems="center" sx={{ maxWidth: 300, m: 'auto' }}>
      <>
        <InputLabel>Min</InputLabel>
        <AmountTextField
          error={error}
          value={min || ''}
          onChange={(e) => onMinChange(e.target.value)}
          placeholder="No min"
        />
      </>

      <Slider
        value={min || 0}
        min={0}
        max={50000}
        step={100}
        onChange={(e) => onMinChange(e.target.value)}
        sx={{ mt: 1 }}
      />
    </Stack>
  );
}

MinAmountFilter.propTypes = {
  min: PropTypes.number.isRequired,
  onMinChange: PropTypes.func.isRequired,
};
