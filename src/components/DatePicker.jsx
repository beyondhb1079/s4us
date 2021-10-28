import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MuiDatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

function DatePicker(props) {
  const { label, labelStyle, formik } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <MuiDatePicker
        inputFormat="MM/dd/yyyy"
        value={formik.values.deadline}
        onChange={(date) => formik.setFieldValue('deadline', date)}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            id="deadline"
            variant="outlined"
            fullWidth
            helperText={formik.errors.deadline}
            error={Boolean(formik.errors.deadline)}
          />
        )}
      />
    </LocalizationProvider>
  );
}

DatePicker.propTypes = exact({
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.string,
  formik: PropTypes.object.isRequired,
});

DatePicker.defaultProps = {
  labelStyle: null,
};

export default DatePicker;
