import { FormikConfig, FormikValues } from 'formik';
import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MuiDatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  InputLabel,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from '@mui/material';

interface DeadlineFieldProps {
  /** The result of `useFormik()`. */
  formik?: Partial<FormikConfig<FormikValues>>;
  label: string;
  labelStyle?: SxProps<Theme>;
  id?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

export default function DeadlineField(props: DeadlineFieldProps): JSX.Element {
  const { label, labelStyle, formik, value, onChange, id } = props;

  const dateValue = formik ? formik.values.deadline : value;
  const handleChange = (date: Date | null) => {
    if (formik) {
      formik.setFieldValue('deadline', date);
    }
    if (onChange) {
      onChange(date);
    }
  };

  const helperText = formik ? formik.errors.deadline : '';
  const error = formik ? Boolean(formik.errors.deadline) : false;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel sx={labelStyle}>{label}</InputLabel>
      <MuiDatePicker
        inputFormat="MM/dd/yyyy"
        value={dateValue}
        onChange={handleChange}
        renderInput={(params: TextFieldProps) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            id={id}
            variant="outlined"
            fullWidth
            helperText={helperText}
            error={error}
          />
        )}
      />
    </LocalizationProvider>
  );
}
