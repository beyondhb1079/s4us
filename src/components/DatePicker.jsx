import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  datePickerStyle: {
    minWidth: 400,
  },
});

function DatePicker(props) {
  const classes = useStyles();
  const { id, label, error, helperText, value, onChange } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={classes.datePickerStyle}
        format="MM/dd/yyyy"
        required
        helperText={error && helperText}
        {...{ id, label, error, value, onChange }}
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
});
DatePicker.defaultProps = {
  value: null, // so console doesn't complain about deadline being null in the beginning
  error: false,
  helperText: '',
};
export default DatePicker;
