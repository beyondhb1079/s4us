import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';

function DateField(props) {
  const { id, label, value, handler } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        id={id}
        label={label}
        format="MM/dd/yyyy"
        fullWidth
        required
        value={value}
        onChange={(date) => handler(id, date)}
      />
    </MuiPickersUtilsProvider>
  );
}
DateField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date).isRequired,
  handler: PropTypes.func.isRequired,
};
export default DateField;
