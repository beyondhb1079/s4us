import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  amountField: {
    maxWidth: 130,
  },
}));

function AmountTextField(props) {
  const classes = useStyles();
  const { value, onChange, disabled, error, variation } = props;

  return (
    <TextField
      className={classes.amountField}
      variant={variation}
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
  variation: PropTypes.string,
};
AmountTextField.defaultProps = {
  disabled: false,
  error: false,
  variation: 'outlined',
};
export default AmountTextField;
