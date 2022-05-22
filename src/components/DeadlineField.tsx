import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MuiDatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { InputLabel, SxProps, TextField, Theme } from '@mui/material';

interface DeadlineFieldProps {
  /** The result of `useFormik()`. */
  formik: any;
  label: string;
  labelStyle?: SxProps<Theme>;
}

function DeadlineField(props: DeadlineFieldProps): JSX.Element {
  const { label, labelStyle, formik } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel sx={labelStyle}>{label}</InputLabel>
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

export default DeadlineField;
