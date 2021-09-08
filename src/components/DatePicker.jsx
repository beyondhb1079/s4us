import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { InputLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

function DatePicker(props) {
  const { id, label, error, helperText, value, onChange, labelStyle } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <KeyboardDatePicker
        inputVariant="outlined"
        format="MM/dd/yyyy"
        {...{
          id,
          error,
          value,
          onChange,
          helperText,
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
DatePicker.propTypes = exact({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  labelStyle: PropTypes.string,
});
DatePicker.defaultProps = {
  value: null, // so console doesn't complain about deadline being null in the beginning
  error: false,
  helperText: '',
  labelStyle: null,
};
export default DatePicker;
