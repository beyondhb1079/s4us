import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

function DatePicker(props) {
  const { id, label, error, helperText, value, onChange, className } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        format="MM/dd/yyyy"
        {...{ id, label, error, value, onChange, helperText, className }}
        fullWidth
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
  className: PropTypes.string,
});
DatePicker.defaultProps = {
  value: null, // so console doesn't complain about deadline being null in the beginning
  error: false,
  helperText: '',
  className: null,
};
export default DatePicker;
