import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  amountField: {
    maxWidth: 130,
  },
}));

function AmountTextField(props) {
  const classes = useStyles();
  const { value, onChange, disabled, error } = props;

  return (
    <TextField
      className={classes.amountField}
      variant="outlined"
      placeholder="Unknown"
      InputProps={{
        inputProps: { min: 0, max: 100000, step: 50 },
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      {...{ error, disabled, value, onChange }}
    />
  );
}
AmountTextField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};
AmountTextField.defaultProps = {
  disabled: false,
  error: false,
};
export default AmountTextField;
