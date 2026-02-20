import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { InputLabel, SxProps, Theme } from '@mui/material';

interface DeadlineFieldProps {
  /** The result of `useFormik()`. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik?: any;
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
        value={dateValue}
        onChange={handleChange}
        slotProps={{
          textField: {
            id,
            variant: 'outlined',
            fullWidth: true,
            helperText: helperText as string,
            error,
          },
        }}
      />
    </LocalizationProvider>
  );
}
