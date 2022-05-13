import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Slider } from '@mui/material';
import AmountTextField from './AmountTextField';

export default function MinAmountFilter(props) {
  const { min, onMinChange } = props;
  const error = min < 0;

  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={2}
      sx={{ maxWidth: 300, m: 'auto' }}>
      <Slider
        value={min}
        min={0}
        max={50000}
        step={100}
        onChange={(e) => onMinChange(e.target.value)}
        sx={{ mt: 1 }}
      />

      <AmountTextField
        error={error}
        value={min || ''}
        onChange={(e) => onMinChange(e.target.value)}
        variant="standard"
        placeholder="No min"
      />
    </Stack>
  );
}

MinAmountFilter.propTypes = {
  min: PropTypes.number,
  onMinChange: PropTypes.func.isRequired,
};

MinAmountFilter.defaultProps = {
  min: 0,
};
