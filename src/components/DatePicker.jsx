import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

function OurDatePicker(props) {
  const { id, label, error, helperText, value, onChange, labelStyle } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <DatePicker
        inputFormat="MM/dd/yyyy"
        onChange={onChange}
        value={value}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            fullWidth
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...{ error, helperText, id, ...params }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
OurDatePicker.propTypes = exact({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  labelStyle: PropTypes.string,
});
OurDatePicker.defaultProps = {
  value: null, // so console doesn't complain about deadline being null in the beginning
  error: false,
  helperText: '',
  labelStyle: null,
};
export default OurDatePicker;
