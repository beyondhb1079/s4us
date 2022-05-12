import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';

const AmountTextField = (props) => (
  <TextField
    sx={{ maxWidth: 120 }}
    InputProps={{
      inputProps: { min: 0, max: 100000, step: 100 },
      startAdornment: <InputAdornment position="start">$</InputAdornment>,
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

AmountTextField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
};

AmountTextField.defaultProps = {
  disabled: false,
  error: false,
  variant: 'outlined',
};

export default AmountTextField;
