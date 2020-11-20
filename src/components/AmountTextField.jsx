import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  amountField: {
    margin: theme.spacing(1),
    maxWidth: 120,
  },
}));

function AmountTextField(props) {
  const classes = useStyles();
  const { value, onChange, disabled, error } = props;

  return (
    <TextField
      className={classes.amountField}
      placeholder="Unknown"
      InputProps={{
        inputProps: { min: 0, step: 50 },
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      {...{ error, disabled, value, onChange }}
    />
  );
}
AmountTextField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.bool,
};
AmountTextField.defaultProps = {
  error: false,
};
export default AmountTextField;
