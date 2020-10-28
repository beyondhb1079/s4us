import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function DateField(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker format="MM/dd/yyyy" fullWidth required {...props} />
    </MuiPickersUtilsProvider>
  );
}

export default DateField;
