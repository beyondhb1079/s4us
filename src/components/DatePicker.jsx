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
  const { id, label, value, onChange } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        format="MM/dd/yyyy"
        fullWidth
        required
        {...{ id, label, value, onChange }}
      />
    </MuiPickersUtilsProvider>
  );
}
DatePicker.propTypes = exact({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
});
export default DatePicker;
